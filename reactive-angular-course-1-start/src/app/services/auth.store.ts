import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../model/user';
import { map, shareReplay, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

const AUTH_DATA = "auth_data";

@Injectable({
  providedIn: 'root'
})
export class AuthStore {
  //// Subject per mantenir l'estat actual de l'usuari autenticat
  private subject = new BehaviorSubject<User>(null);
  //Observable que emet els canvis de l'usuari autenticat
  user$: Observable<User> = this.subject.asObservable();

  isLoggedIn$: Observable<boolean>;
  isLoggedOut$: Observable<boolean>;

  constructor(private http: HttpClient) {
    //és true si hi ha un usuari (no null)
    this.isLoggedIn$ = this.user$.pipe(map(user => !!user));
    //l'invers
    this.isLoggedOut$ = this.isLoggedIn$.pipe(map(loggedIn => !loggedIn));
  }

  login(email: string, password: string): Observable<User> {
    return this.http.post<User>("/api/login", { email, password })
      //Quan s'obté resposta positiva, s'actualitza el subject amb l'usuari
      .pipe(
        tap(user => {
          this.subject.next(user);
        }),
        shareReplay()
      );
  }

  //es posa el subject a null
  logout() {
    this.subject.next(null);
  }
}
