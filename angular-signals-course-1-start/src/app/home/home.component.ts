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

  counter = signal(0);

  constructor() {
    //executa una funció cada vegada que algun signal utilitzat dins seu canvia.
    effect(() => {
      console.log(`counter value: ${this.counter()}`);
    })
  }

  //Incrementa el counter en 1.
  increment() {
    this.counter.update(val => val + 1);
  }
}


//per: console.log, peticions HTTP, actualitzar el DOM fora d'Angular, etc.
