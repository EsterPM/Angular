import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject,of} from 'rxjs';
import {concatMap, finalize, tap} from 'rxjs/operators';


@Injectable()
export class LoadingService {

    loading$: Observable<boolean>;


    showLoaderUntilCompleted<T>(obs$: Observable<T>): Observable<T> {
       return undefined;
    }

    loadingOn() {


    }

    loadingOff() {

    }

}
