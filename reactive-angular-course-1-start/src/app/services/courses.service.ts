import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Course } from '../model/course';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Lesson } from '../model/lesson';

//Estigui disponible a tota l'aplicació.
@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private http: HttpClient) {

  }

  //tots els cursos
  loadAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>("/api/courses")
      .pipe(
        //s'agafa només el contingut de res.payload, que és l'array de cursos, i s'emet com a resultat de l'observable.
        map(res => res["payload"]),
        //compartir els valors d'un observable entre múltiples subscripcions, sense repetir la petició HTTP
        shareReplay()
      );
  }

  saveCourse(courseId: string, changes: Partial<Course>): Observable<any> {
    return this.http.put(`/api/courses/${courseId}`, changes)
      .pipe(
        shareReplay()
      );
  }

  searchLessons(search: string): Observable<Lesson[]> {
    return this.http.get<Lesson[]>('/api/lessons', {
      params: {
        filter: search, //Paràmetre de filtre per a la cerca
        pageSize: "100" //Nombre màxim de resultats retornats
      }
    })
      .pipe(
        map(res => res["payload"]),
        shareReplay()
      );
  }
}
