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

  //és un signal derivat de counter.
  //Cada vegada que counter canvia, aquest computed es recalcula automàticament.
  tenXCounter = computed(() => {
    const val = this.counter();
    return val * 10;
  })

  //computed, que depèn del primer (tenXCounter).
  //Això demostra que els computed poden encadenar-se i Angular resoldrà les dependències automàticament.
  hundredXCounter = computed(() => {
    const val = this.tenXCounter();
    return val * 10;
  })

  //Incrementa el counter en 1.
  //Això farà que tenXCounter i hundredXCounter es recalculin automàticament gràcies al sistema reactiu de signals.
  increment() {
    this.counter.update(val => val + 1);
  }
}


//computed() és útil per valors derivats que es recalculen automàticament en funció d'altres signals.
