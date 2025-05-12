
import { CoursesServiceWithFetch } from './../services/courses-fetch.service';
import { timeout } from 'rxjs/operators';
import { afterNextRender, Component, computed, effect, EffectRef, inject, Injector, signal, viewChild } from '@angular/core';
import { CoursesService } from "../services/courses.service";
import { Course, sortCoursesBySeqNo } from "../models/course.model";
import { MatTab, MatTabGroup } from "@angular/material/tabs";
import { CoursesCardListComponent } from "../courses-card-list/courses-card-list.component";
import { MatDialog } from "@angular/material/dialog";
import { MessagesService } from "../messages/messages.service";
import { catchError, from, throwError } from "rxjs";
import { toObservable, toSignal, outputToObservable, outputFromObservable } from "@angular/core/rxjs-interop";
import { openEditCourseDialog } from '../edit-course-dialog/edit-course-dialog.component';
import { MatTooltip } from '@angular/material/tooltip';


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

  messageService = inject(MessagesService);


  //viewChild = Recupera un únic element del DOM o component fill. (Formularis, inputs, components únics)
  beginnersList = viewChild("beginnersList",
    {
      read: MatTooltip
    }
  );

  constructor() {
    effect(() => {
      console.log(`beginnersList: `, this.beginnersList())
    })

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
      this.messageService.showMessage(
        `Error loading courses!`,
        "error"
      );
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
    //-Si l'usuari tanca el formulari sense guardar, newCourse serà falsy (null o undefined).
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

  injector = inject(Injector);

  onToObservableExample() {
    const numbers = signal(0);
    //El valor del signal es canvia tres cops, però només es guarda l'últim valor (3).
    numbers.set(1);
    numbers.set(2);
    numbers.set(3);
    //Es converteix el signal en un Observable
    const numbers$ = toObservable(numbers, {
      injector: this.injector
    });
    //Encara que s'estableixi abans de la subscripció, no es capturarà en l'observable perquè aquest encara no s'ha subscrit.
    numbers.set(4);
    //Es fa la subscripció. A partir d'aquest punt, qualsevol canvi al signal emetrà valors a l'observable.
    numbers$.subscribe(val => {
      console.log(`numbers$: `, val)
    })
    //Aquest canvi sí que serà capturat i mostrat pel console.log
    numbers.set(5);
  }

  courses$ = from(this.coursesService.loadAllCourses());

  //convertir un Observable a un Signal
  onToSignalExample() {
    try {
      //Creació d'un observable amb gestió d'errors
      const courses$ = from(this.coursesService.loadAllCourses())
        .pipe(
          catchError(err => {
            console.log(`Error caught in catchError`, err)
            throw err;
          })
        );

      //Conversió a signal
      const courses = toSignal(courses$, {
        injector: this.injector,
        rejectErrors: true //si hi ha un error, no s'ignora
      })

      //canvis del signal i mostrar els cursos per consola
      effect(() => {
        console.log(`Courses: `, courses())
      }, {
        injector: this.injector
      })

      //Cada segon s'imprimeix el valor actual del signal
      setInterval(() => {
        console.log(`Reading courses signal: `, courses())
      }, 1000)

    }
    catch (err) {
      console.log(`Error in catch block: `, err)
    }
  }
}



