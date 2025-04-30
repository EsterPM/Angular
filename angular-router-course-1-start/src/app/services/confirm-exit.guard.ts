import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot} from '@angular/router';
import {CourseComponent} from '../courses/course/course.component';
import {Observable} from 'rxjs';


//s'utilitza per evitar que un usuari surti d'una pàgina si, per exemple, té canvis sense desar.

//Aquest guard impedeix sortir del component CourseComponent si no es confirma prèviament.
@Injectable()
export class ConfirmExitGuard implements CanDeactivate<CourseComponent> {

    canDeactivate(component: CourseComponent,
                  currentRoute: ActivatedRouteSnapshot,
                  currentState: RouterStateSnapshot,
                  nextState?: RouterStateSnapshot): boolean  {

        return component.confirmExit();

    }
}
