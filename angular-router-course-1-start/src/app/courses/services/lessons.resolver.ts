import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { LessonSummary } from '../model/lesson-summary';
import { Observable } from 'rxjs';
import { CoursesService } from './courses.service';


//Retorna un Observable<LessonSummary[]>, que conté el resum de totes les lliçons del curs (LessonSummary[]).
@Injectable()
export class LessonsResolver implements Resolve<LessonSummary[]> {

  constructor(private courses: CoursesService) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<LessonSummary[]> {

    //agafa el paràmetre de l'URL per saber quin curs s'ha de carregar.
    const courseUrl = route.paramMap.get("courseUrl");

    //fa una crida al servei per obtenir totes les lliçons del curs.
    return this.courses.loadAllCourseLessonsSummary(courseUrl);

  }
}
