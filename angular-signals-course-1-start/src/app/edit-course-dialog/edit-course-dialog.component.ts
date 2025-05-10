import {Component, effect, inject, signal} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material/dialog";
import {Course} from "../models/course.model";
import {EditCourseDialogData} from "./edit-course-dialog.data.model";
import {CoursesService} from "../services/courses.service";
import {LoadingIndicatorComponent} from "../loading/loading.component";
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {CourseCategoryComboboxComponent} from "../course-category-combobox/course-category-combobox.component";
import {CourseCategory} from "../models/course-category.model";
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'edit-course-dialog',
  standalone: true,
  imports: [
    LoadingIndicatorComponent,
    ReactiveFormsModule,
    CourseCategoryComboboxComponent
  ],
  templateUrl: './edit-course-dialog.component.html',
  styleUrl: './edit-course-dialog.component.scss'
})
export class EditCourseDialogComponent {
  //Inyectes MatDialogRef per controlar el diàleg (tancar-lo, passar resultats…).
  dialogRef = inject(MatDialogRef);

  //Injectes les dades que has passat al obrir el diàleg
  data: EditCourseDialogData = inject(MAT_DIALOG_DATA);

  //Injectes FormBuilder per poder crear el formulari de manera més senzilla.
  fb = inject(FormBuilder);

  //formulari reactiu
  form = this.fb.group({
    title: [''],
    longDescription: [''],
    category: [''],
    iconUrl: ['']
  });

  courseService = inject(CoursesService);

  //Al construir el component, emplenes el formulari amb les dades del curs que has passat com a entrada.
  constructor() {
    this.form.patchValue({
      title: this.data?.course?.title,
      longDescription: this.data?.course?.longDescription,
      category: this.data?.course?.category,
      iconUrl: this.data?.course?.iconUrl
    });
  }

  onClose() {
    this.dialogRef.close();
  }

  //Obtenim el contingut actual del formulari i l'assignem com un objecte parcial de tipus Course (perquè pot no tenir tots els camps).
  async onSave() {
    const courseProps =
      this.form.value as Partial<Course>;
    //Si el mode és "update", cridem a la funció que guarda el curs amb l'id del curs original i els canvis.
    if (this.data?.mode === "update") {
      await this.saveCourse(this.data?.course!.id, courseProps);
    }
  }

  async saveCourse(courseId:string, changes: Partial<Course>) {
    try {
      const updatedCourse =
        await this.courseService.saveCourse(courseId, changes);
      this.dialogRef.close(updatedCourse); //tanques el diàleg i retornes el curs actualitzat al component pare (CoursesCardListComponent
    }
    catch (err) {
      console.error(err);
      alert(`Failed to save the course.`);
    }
  }

}

export async function openEditCourseDialog(
  dialog: MatDialog,
  data: EditCourseDialogData) {
  const config = new MatDialogConfig();
  config.disableClose = true; //l'usuari no pot tancar-lo fent clic fora.
  config.autoFocus = true; //el focus es posa automàticament al primer input.
  config.width  = "400px";
  config.data = data; //passem la informació que necessitem dins el diàleg.

  //Obres el diàleg i esperes a que es tanqui (afterClosed()).
  const close$ = dialog.open(EditCourseDialogComponent,config)
    .afterClosed();

  return firstValueFrom(close$);
}
