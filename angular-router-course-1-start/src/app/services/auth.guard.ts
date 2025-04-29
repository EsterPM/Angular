import { Injectable } from '@angular/core';
import { AuthStore } from './auth.store';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

//comprova si un usuari està autenticat abans de permetre l'accés a una ruta concreta.

//CanActivate, s'utilitza per impedir que un usuari accedeixi a una ruta si no compleix certa condició
@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthStore,
    private router: Router) {

  }


  //S'executa quan l'usuari intenta accedir a una ruta protegida
  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):
    Observable<boolean | UrlTree> {

    return this.auth.isLoggedIn$
      .pipe(
        map(loggedIn =>
          loggedIn ? true : this.router.parseUrl('/login')
        )
      );
  }
}
