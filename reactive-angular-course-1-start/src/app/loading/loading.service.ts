import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject,of} from 'rxjs';
import {concatMap, finalize, tap} from 'rxjs/operators';


@Injectable()
export class LoadingService {

    //manté l'estat actual de la càrrega
    private loadingSubject = new BehaviorSubject<boolean>(false);

    //Es fa pública una versió observable només de lectura del subjecte.
    loading$: Observable<boolean> = this.loadingSubject.asObservable();


    showLoaderUntilCompleted<T>(obs$: Observable<T>): Observable<T> {
      return undefined;
    }

    loadingOn() {
        this.loadingSubject.next(true);

    }

    loadingOff() {
        this.loadingSubject.next(false);
    }
}
