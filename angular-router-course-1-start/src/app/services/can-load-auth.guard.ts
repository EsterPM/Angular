import {Injectable} from '@angular/core';
import {AuthStore} from './auth.store';
import {CanLoad, CanMatch, Route, Router, UrlSegment} from '@angular/router';
import {Observable} from 'rxjs';
import {first, tap} from 'rxjs/operators';

//impedir que es carregui un mòdul complet (lazy-loaded) si l'usuari no està autenticat.

@Injectable()
export class CanLoadAuthGuard implements CanMatch {


    constructor(private auth: AuthStore, private router: Router) {

    }

    canMatch(route: Route, segments: UrlSegment[]): Observable<boolean>  {

        return this.auth.isLoggedIn$
            .pipe(
                first(),
                tap(loggedIn => {
                    if (!loggedIn) {
                        this.router.navigateByUrl('/login');
                    }
                })
            );

    }
}


//Angular ara recomana utilitzar canMatch per fer aquest tipus de validació de càrrega condicional de mòduls.
//No canLoad
