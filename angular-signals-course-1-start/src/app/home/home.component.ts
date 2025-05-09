import { timeout } from 'rxjs/operators';
import { afterNextRender, Component, computed, effect, EffectRef, inject, Injector, signal } from '@angular/core';
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

  //referència a l'effect(), que et permet destruir-lo manualment més endavant.
  effectRef: EffectRef | null = null;


  constructor() {

    this.effectRef = effect((onCleanup) => {
      const counter = this.counter();
      //Espera 1 segon abans de fer un console.log
      const timeout = setTimeout(() => {
        console.log(`counter value: ${counter}`);
      }, 1000)

      //S'executa abans que aquest effect() es torni a executar de nou.
      //També s'executa quan el effect() es destrueix amb .destroy().
      onCleanup(() => {
        console.log("Callin clean up");
        clearTimeout(timeout);
      })
    })
  }


  //Incrementa el counter en 1.
  increment() {
    this.counter.update(val => val + 1);
  }

  //Destrueix completament l'effect(), El counter() pot canviar, però l'effect() ja no reaccionarà.
  cleanup() {
    this.effectRef?.destroy();
  }
}


//Això és per temporitzadors, intervals, subscripcions, etc.
