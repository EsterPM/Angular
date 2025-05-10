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
import { openEditCourseDialog } from '../edit-course-dialog/edit-course-dialog.component';


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

  dialog = inject(MatDialog);

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

  //actualitza la llista de cursos al signal privat #courses després que un curs hagi estat modificat mitjançant el diàleg.
  onCourseUpdated(updatedCourse: Course) {
    const courses = this.#courses();
    const newCourses = courses.map(course => (
      course.id === updatedCourse.id ? updatedCourse : course
    ));
    this.#courses.set(newCourses);
  }

  async onCourseDeleted(courseId: string) {
    try {
      await this.coursesService.deleteCourse(courseId);
      const courses = this.#courses();
      //Filtra l'array per treure el curs amb l'id que volem eliminar.
      const newCourses = courses.filter(
        course => course.id !== courseId)
      this.#courses.set(newCourses);
    }
    catch (err) {
      console.error(err)
      alert(`Error deleting course.`)
    }
  }

  //mostrar un formulari per crear un nou curs, i si es crea correctament, l'afegeix a la llista de cursos existents.
  async onAddCourse() {
    const newCourse = await openEditCourseDialog(
      this.dialog,
      {
        mode: "create",
        title: "Create New Course"
      }
    )
    //Si l'usuari tanca el formulari sense guardar, newCourse serà falsy (null o undefined).
    if (!newCourse) {
      return;
    }
    //Creem una nova llista de cursos, copiant els existents (...this.#courses()) i afegint el nou curs al final.
    const newCourses = [
      ...this.#courses(),
      newCourse
    ];
    //actualitzem el signal reactiu #courses amb la nova llista.
    this.#courses.set(newCourses);
  }

}



