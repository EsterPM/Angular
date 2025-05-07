import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { Course, sortCoursesBySeqNo } from '../model/course';
import { catchError, map, shareReplay, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { LoadingService } from '../loading/loading.service';
import { MessagesService } from '../messages/messages.service';


@Injectable({
  providedIn: 'root' //Aquest servei està disponible a tota l'aplicació (injecció global)
})
export class CoursesStore {
  //emet la llista actual de cursos
  private subject = new BehaviorSubject<Course[]>([]);

  //Observable públic al qual es poden subscriure altres components per rebre els cursos
  courses$: Observable<Course[]> = this.subject.asObservable();

  constructor(private http: HttpClient,
    private loading: LoadingService,
    private messages: MessagesService) {

    //Es carrega automàticament la llista de cursos quan es crea la instància
    this.loadAllCourses();
  }

  private loadAllCourses() {
    const loadCourses$ = this.http.get<Course[]>('/api/courses')
      .pipe(
        map(response => response["payload"]),
        catchError(err => {
          const message = "Could not load courses";
          this.messages.showErrors(message);
          console.log(message, err);
          return throwError(err);
        }),
        tap(courses => this.subject.next(courses)) //S'emet la llista de cursos al subject
      );

    // Es mostra l'spinner mentre es completa la càrrega dels cursos
    this.loading.showLoaderUntilCompleted(loadCourses$)
      .subscribe();
  }


  saveCourse(courseId: string, changes: Partial<Course>): Observable<any> {
    //S'obté la llista actual de cursos des del BehaviorSubject
    const courses = this.subject.getValue();
    //Es busca l'índex del curs que coincideix amb l'ID passat per paràmetre
    const index = courses.findIndex(course => course.id == courseId);

    //Es crea un nou objecte de curs amb els canvis aplicats
    const newCourse: Course = {
      ...courses[index],
      ...changes
    };

    const newCourses: Course[] = courses.slice(0);
    newCourses[index] = newCourse;
    //S'emet la nova llista de cursos amb el curs actualitzat
    this.subject.next(newCourses);

    return this.http.put(`/api/courses/${courseId}`, changes)
      .pipe(
        catchError(err => {
          const message = "Could not save course";
          console.log(message, err);
          this.messages.showErrors(message);
          return throwError(err);
        }),
        //evita que la petició es repeteixi en múltiples subscripcions
        shareReplay()
      );
  }


  filterByCategory(category: string): Observable<Course[]> {
    return this.courses$
      .pipe(
        map(courses =>
          courses.filter(course => course.category == category)
            .sort(sortCoursesBySeqNo) //Ordena segons la seqüència
        )
      )
  }
}
