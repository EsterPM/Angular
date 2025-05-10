import { Injectable, signal } from "@angular/core";
import { Message, MessageSeverity } from "../models/message.model";


@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  //Signal privat, conté un missatge o null si no n'hi ha cap.
  #messageSignal = signal<Message | null>(null);

  //versió només de lectura del signal anterior.
  message = this.#messageSignal.asReadonly();

  //Assignem un nou valor al signal
  showMessage(text: string, severity: MessageSeverity) {
    this.#messageSignal.set({
      text, severity
    })
  }

  //neteja el missatge (el torna a null).
  clear() {
    this.#messageSignal.set(null);
  }

}

