import { CoursesStore } from './../services/courses.store';
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
    private coursesStore: CoursesStore,
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
    //S'obtenen els valors actuals del formulari
    const changes = this.form.value;

    //S'executa la funció per guardar els canvis al curs a través del CoursesStore
    this.coursesStore.saveCourse(this.course.id, changes)
      .subscribe();

    //Es tanca el diàleg i es passen els canvis com a valor de retorn
    this.dialogRef.close(changes);
  }

  close() {
    this.dialogRef.close();
  }
}
