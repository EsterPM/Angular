import { MessagesService } from './../../../../angular-router-course-1-start/src/app/shared/messages/messages.service';
import { Component, OnInit } from '@angular/core';
import { Course, sortCoursesBySeqNo } from '../model/course';
import { interval, noop, Observable, of, throwError, timer } from 'rxjs';
import { catchError, delay, delayWhen, filter, finalize, map, retryWhen, shareReplay, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CourseDialogComponent } from '../course-dialog/course-dialog.component';
import { CoursesService } from '../services/courses.service';
import { LoadingService } from '../loading/loading.service';
import { CoursesStore } from '../services/courses.store';


@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: false
})
export class HomeComponent implements OnInit {

  beginnerCourses$: Observable<Course[]>;

  advancedCourses$: Observable<Course[]>;

  //Eliminem coursesService perque farem servir el Store.
  constructor(
    private coursesStore: CoursesStore) {

  }

  ngOnInit() {
    this.reloadCourses();
  }

  reloadCourses() {
    this.beginnerCourses$ = this.coursesStore.filterByCategory("BEGINNER");

    this.advancedCourses$ = this.coursesStore.filterByCategory("ADVANCE");

  }
}
