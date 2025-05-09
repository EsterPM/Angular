import { CoursesServiceWithFetch } from './../services/courses-fetch.service';
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
  //signal privat (#)
  #courses = signal<Course[]>([]);

  //Injecta el servei que tu mateix has creat, que carrega els cursos des d'una API.
  coursesService = inject(CoursesService);

  //Dos signals derivats que es recalculen automàticament quan canvia #courses.
  beginnerCourses = computed(() => {
    const courses = this.#courses();
    return courses.filter(course =>
      course.category === "BEGINNER")
  });

  advancedCourses = computed(() => {
    const courses = this.#courses();
    return courses.filter(course =>
      course.category === "ADVANCED")
  });

  constructor() {
    effect(() => {
      console.log(`Beginner courses: `, this.beginnerCourses())
      console.log(`Advanced courses: `, this.advancedCourses())
    });

    this.loadCourses()
      .then(() => console.log(`All courses loaded:`, this.#courses())); //Un cop carregats, els posa dins el signal #courses
  }

  //Assigna les dades al signal, cosa que activa automàticament els computed() i effect()
  async loadCourses() {
    try {
      const courses = await this.coursesService.loadAllCourses();
      this.#courses.set(courses.sort(sortCoursesBySeqNo)); //ordenar els cursos abans de guardar-los en el signal reactiu.
    }
    catch (err) {
      alert(`Error loading courses!`);
      console.error(err);
    }
  }

}



