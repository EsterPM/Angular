import { Component, inject, input, output } from '@angular/core';
import { RouterLink } from "@angular/router";
import { Course } from "../models/course.model";
import { MatDialog } from "@angular/material/dialog";
import { openEditCourseDialog } from '../edit-course-dialog/edit-course-dialog.component';

@Component({
  selector: 'courses-card-list',
  imports: [
    RouterLink
  ],
  templateUrl: './courses-card-list.component.html',
  styleUrl: './courses-card-list.component.scss'
})
export class CoursesCardListComponent {

  //És com un @Input(), però reactiu (és un Signal).
  courses = input.required<Course[]>(); //li dius que el component ha de rebre una llista de cursos.

  //output<Type>() crea un event emitter reactiu per comunicar-se cap amunt (del fill al pare).
  courseUpdated = output<Course>();
  courseDeleted = output<string>();

  //Injectes el servei MatDialog per poder obrir diàlegs.
  dialog = inject(MatDialog);

  //await espera a que es tanqui el diàleg i rep el nou curs com a resposta (si es guarda).
  async onEditCourse(course: Course) {
    const newCourse = await openEditCourseDialog(
      this.dialog,
      {
        mode: "update",
        title: "Update Existing Course",
        course
      }
    )
    console.log(`Course edited:`, newCourse);
    this.courseUpdated.emit(newCourse);
  }

  //emetrà l'ID del curs que s'ha esborrat cap al component pare.
  onCourseDeleted(course: Course) {
    this.courseDeleted.emit(course.id);
  }
}
