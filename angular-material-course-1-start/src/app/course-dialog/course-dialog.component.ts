import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { Course } from "../model/course";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import * as moment from 'moment';

@Component({
  selector: 'course-dialog',
  templateUrl: './course-dialog.component.html',
  styleUrls: ['./course-dialog.component.css'],
  standalone: false
})
export class CourseDialogComponent implements OnInit {

  description: string;

  //Es crea un formulari reactiu amb els valors per defecte del curs (this.course) injectat.
  form = this.fb.group({
    description: [this.course.description, Validators.required],
    category: [this.course.category, Validators.required],
    releasedAt: [new Date(), Validators.required],
    longDescription: [this.course.longDescription, Validators.required]
  });

  constructor(private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) private course: Course,
    private dialogRef: MatDialogRef<CourseDialogComponent>) {

    //S'assigna la descripció del curs a una variable de suport
    this.description = course.description;
  }

  ngOnInit() {

  }

  close() {
    this.dialogRef.close();
  }

  //Tanca el diàleg i retorna els valors del formulari.
  save() {
    this.dialogRef.close(this.form.value);
  }
}

//obre el diàleg amb configuració específica
export function openEditCourseDialog(dialog: MatDialog, course: Course) {

  const config = new MatDialogConfig();

  //evita que es tanqui fent clic fora
  config.disableClose = true;
  config.autoFocus = true;

  //permeten personalitzar l'estil del dialeg en diferents pantallas.
  config.panelClass = "modal-panel";
  config.backdropClass = "backdrop-modal-panel";

  //Es passa el curs com a data.
  config.data = {
    ...course
  };

  //Retorna un observable de afterClosed(), que es pot subscriure per rebre els valors del formulari un cop tancat.
  const dialogRef = dialog.open(CourseDialogComponent, config);

  return dialogRef.afterClosed();
}
