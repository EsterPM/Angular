import { MessagesService } from './../../../../angular-router-course-1-start/src/app/shared/messages/messages.service';
import { AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Course } from "../model/course";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import moment from 'moment';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { CoursesService } from '../services/courses.service';
import { LoadingService } from '../loading/loading.service';

@Component({
  selector: 'course-dialog',
  templateUrl: './course-dialog.component.html',
  styleUrls: ['./course-dialog.component.css'],
  providers: [
    LoadingService, //S'afageixen perque dialog está fora de la linea dels altres
    MessagesService
  ],
  standalone: false
})
export class CourseDialogComponent implements AfterViewInit {

  form: FormGroup;

  course: Course;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CourseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) course: Course,
    private coursesService: CoursesService,
    private loadingService: LoadingService,
    private messagesService: MessagesService) {

    this.course = course;

    this.form = fb.group({
      description: [course.description, Validators.required],
      category: [course.category, Validators.required],
      releasedAt: [moment(), Validators.required],
      longDescription: [course.longDescription, Validators.required]
    });

  }

  ngAfterViewInit() {

  }

  save() {
    const changes = this.form.value;

    //Observable que fa la petició HTTP per desar els canvis.
    const saveCourse$ = this.coursesService.saveCourse(this.course.id, changes)
      .pipe(
        catchError(err => {
          const message = "Could not save course";
          console.log(message, err);
          this.messagesService.showErrors(message);
          return throwError(err);
        })
      );

    //Mostra el spinner mentre s'està guardant, i l'amaga quan acaba.
    this.loadingService.showLoaderUntilCompleted(saveCourse$)
      .subscribe(
        val => {
          this.dialogRef.close(val); //es tanca el diàleg i es retorna el valor rebut (val) al component que va obrir el diàleg.
        }
      );
  }

  close() {
    this.dialogRef.close();
  }

}
