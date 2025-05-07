import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';


@Injectable()
export class MessagesService {

  //manté la llista d'errors actuals
  private subject = new BehaviorSubject<string[]>([]);

  //Observable que emet errors només si hi ha com a mínim un missatge
  errors$: Observable<string[]> = this.subject.asObservable()
    .pipe(
      filter(messages => messages && messages.length > 0) //Filtra emissions buides
    );

  //Mostra errors actualitzant el subject amb una nova llista d'errors
  showErrors(...errors: string[]) {
    this.subject.next(errors);
  }

}
