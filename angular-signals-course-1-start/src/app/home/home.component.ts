import { afterNextRender, Component, computed, effect, inject, Injector, signal } from '@angular/core';
import { CoursesService } from "../services/courses.service";
import { Course, sortCoursesBySeqNo } from "../models/course.model";
import { MatTab, MatTabGroup } from "@angular/material/tabs";
import { CoursesCardListComponent } from "../courses-card-list/courses-card-list.component";
import { MatDialog } from "@angular/material/dialog";
import { MessagesService } from "../messages/messages.service";
import { catchError, from, throwError } from "rxjs";
import { toObservable, toSignal, outputToObservable, outputFromObservable } from "@angular/core/rxjs-interop";

//Tipo del objecte
type Counter = {
  value: number
};

@Component({
  selector: 'home',
  imports: [
    MatTabGroup,
    MatTab,
    CoursesCardListComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  counter = signal(0);

  //sistema d'injecció de dependències d'Angular
  injector = inject(Injector);

  constructor() {

    //Fa que el codi que hi ha dins s'executi després de la primera renderització del component.
    afterNextRender(() => {
      //Permet vincular l'effect al cicle de vida del component.
      //Si el component es destrueix, l'efecte també s'elimina automàticament.
      effect(() => {
        console.log(`counter value: ${this.counter()}`);
      },
      {
        injector:this.injector
      })
    })
  }

  //Incrementa el counter en 1.
  increment() {
    this.counter.update(val => val + 1);
  }
}


/*Sense injector, l'effect() no estaria vinculat al component,
i podria quedar-se actiu fins i tot després que el component hagi estat destruït,
generant fuites de memòria. Amb injector, Angular gestiona la subscripció per tu.*/
