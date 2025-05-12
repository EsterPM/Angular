import {ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot} from "@angular/router";
import {Course} from "../models/course.model";
import {CoursesService} from "../services/courses.service";
import {inject} from "@angular/core";

//carregar un curs concret a partir de la seva ID abans que s'activi la ruta
export const courseResolver: ResolveFn<Course | null> =
  async (route: ActivatedRouteSnapshot,
   state: RouterStateSnapshot) => {
    // Obtenim l'ID del curs des de l'URL
    const courseId = route.paramMap.get("courseId");
    if (!courseId) {
      return null;
    }
    const coursesService = inject(CoursesService);
    return coursesService.getCourseById(courseId);
}

//Angular esperarà que això es resolgui abans de continuar amb la navegació.
