import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { Lesson } from "../models/lesson.model";
import { inject } from "@angular/core";
import { LessonsService } from "../services/lessons.service";


export const courseLessonsResolver: ResolveFn<Lesson[]> =
  async (route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) => {

    //Llegeix el paràmetre courseId de la ruta
    const courseId = route.paramMap.get("courseId");

    //Si no hi ha ID del curs, retorna una llista buida
    if (!courseId) {
      return [];
    }

    //Obté el servei LessonsService i crida loadLessons({courseId}) per carregar les lliçons d'aquest curs.
    const lessonsService = inject(LessonsService);
    return lessonsService.loadLessons({ courseId });
  }
