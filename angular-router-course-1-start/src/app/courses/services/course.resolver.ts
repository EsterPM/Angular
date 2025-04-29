import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Course} from '../model/course';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {CoursesService} from './courses.service';
import {first} from 'rxjs/operators';

//Classe que s'encarrega de carregar dades abans que es mostri una ruta.
//Per assegurar-te que una pàgina no es mostra fins que tens totes les dades necessàries carregades

@Injectable()
export class CourseResolver implements Resolve<Course> {

    constructor(private courses: CoursesService) {

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
        Observable<Course> {

        const courseUrl = route.paramMap.get("courseUrl");

        return this.courses.loadCourseByUrl(courseUrl);
    }
}
