import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, of } from 'rxjs';
import { concatMap, finalize, tap } from 'rxjs/operators';


@Injectable()
export class LoadingService {

  //manté l'estat actual de la càrrega
  private loadingSubject = new BehaviorSubject<boolean>(false);

  //Es fa pública una versió observable només de lectura del subjecte.
  loading$: Observable<boolean> = this.loadingSubject.asObservable();

  //Per veure en consola on s'aplica
  constructor() {
    console.log("Loading service created ...");
  }

  //mostrar automàticament el spinner quan comença una operació (obs$) i amagar-lo automàticament quan acaba (o falla).
  showLoaderUntilCompleted<T>(obs$: Observable<T>): Observable<T> {
    return of(null)
      .pipe(
        tap(() => this.loadingOn()), //Mostra el loader
        concatMap(() => obs$), //Executa l'observable passat per paràmetre
        finalize(() => this.loadingOff()) //Amaga el loader
      );
  }

  loadingOn() {
    this.loadingSubject.next(true);

  }

  loadingOff() {
    this.loadingSubject.next(false);
  }
}
