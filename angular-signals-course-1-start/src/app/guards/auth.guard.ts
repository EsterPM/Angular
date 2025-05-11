import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { inject } from "@angular/core";
import { AuthService } from "../services/auth.service";


export const isUserAuthenticated: CanActivateFn =
  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const authService = inject(AuthService);
    const router = inject(Router);
    //Si l'usuari està loguejat, el guard permet accedir a la ruta retornant true.
    if (authService.isLoggedIn()) {
      return true;
    }
    //Si no està loguejat, el guard impedeix l'accés i retorna una redirecció cap a /login.
    else {
      return router.parseUrl('/login')
    }
  }
