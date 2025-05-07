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
