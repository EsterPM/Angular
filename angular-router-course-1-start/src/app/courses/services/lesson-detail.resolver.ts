import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { LessonDetail } from '../model/lesson-detail';
import { CoursesService } from './courses.service';
import { Observable } from 'rxjs';


@Injectable()
export class LessonDetailResolver implements Resolve<LessonDetail> {

  constructor(private courses: CoursesService) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<LessonDetail> {

    //extreu el número de la lliçó de la URL.
    const courseUrl = route.parent.paramMap.get("courseUrl"),
      //puja un nivell per agafar l’URL del curs (perquè la ruta del detall de la lliçó és una ruta filla).
      lessonSeqNo = route.paramMap.get("lessonSeqNo");

    //Crida al servei perquè retorni un Observable<LessonDetail> amb les dades concretes de la lliçó.
    return this.courses.loadLessonDetail(courseUrl, lessonSeqNo);
  }
}
