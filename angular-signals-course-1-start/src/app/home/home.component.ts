import {Component, computed, effect, inject, Injector, signal} from '@angular/core';
import {CoursesService} from "../services/courses.service";
import {Course, sortCoursesBySeqNo} from "../models/course.model";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {CoursesCardListComponent} from "../courses-card-list/courses-card-list.component";
import {MatDialog} from "@angular/material/dialog";
import {MessagesService} from "../messages/messages.service";
import {catchError, from, throwError} from "rxjs";
import {toObservable, toSignal, outputToObservable, outputFromObservable} from "@angular/core/rxjs-interop";

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

  //Objecte amb signal
  counter = signal<Counter>({
    value: 100
  });

  //copia de l'objecte anterior amb ...counter i després li canvies només la propietat value sumant-li 1.
  increment() {
    this.counter.update(counter => ({
      ...counter,
      value: counter.value + 1
    }));
  }
  //Això és important perquè els signals detecten els canvis per referència: si modifiquessis directament counter.value++, Angular no veuria el canvi
}
