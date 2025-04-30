import { Injectable } from '@angular/core';
import { AuthStore } from './auth.store';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

//comprova si un usuari està autenticat abans de permetre l'accés a una ruta concreta.

//CanActivate, s'utilitza per impedir que un usuari accedeixi a una ruta si no compleix certa condició.
//CanActivateChild: impedeix l'accés a les rutes filles d'una ruta si l'usuari no està autenticat.
@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private auth: AuthStore,
    private router: Router) {

  }

  //S'executa quan un usuari intenta accedir directament a una ruta
  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):
    Observable<boolean | UrlTree> {

    return this.checkIfAuthenticated();

  }

  //S'executa quan una ruta té subrutes protegides, i un usuari intenta accedir-hi
  canActivateChild(childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):
    Observable<boolean | UrlTree> {

    return this.checkIfAuthenticated();
  }


  //Funció comuna que consulta si l'usuari està loguejat
  private checkIfAuthenticated() {
    return this.auth.isLoggedIn$
      .pipe(
        map(loggedIn =>
          loggedIn ? true : this.router.parseUrl('/login'))
      );
  }
}
