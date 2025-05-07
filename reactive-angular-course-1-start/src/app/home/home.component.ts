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


@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: false
})
export class HomeComponent implements OnInit {

  beginnerCourses$: Observable<Course[]>;

  advancedCourses$: Observable<Course[]>;


  constructor(private coursesService: CoursesService,
      private loadingService: LoadingService,
      private messagesService: MessagesService) {

  }

  ngOnInit() {
    this.reloadCourses();
  }

  reloadCourses() {

    //Es carrega tota la llista de cursos des del servei CoursesService
    const courses$ = this.coursesService.loadAllCourses()
      .pipe(
        map(courses => courses.sort(sortCoursesBySeqNo)), //ordenar els cursos amb la funció
        catchError(err => {
          const message = "Could not load courses";
          this.messagesService.showErrors(message);
          console.log(message, err);
          return throwError(err); //torna a llençar l'error perquè altres subscripcions (si n'hi ha) també puguin gestionar-lo.
        })
      );

    //Saber si carga o no auto
    const loadCourses$ = this.loadingService.showLoaderUntilCompleted(courses$);

    //Pasar l'observable loadCourses
    this.beginnerCourses$ = loadCourses$
      .pipe(
        map(courses => courses.filter(course => course.category == "BEGINNER"))
      );

    this.advancedCourses$ = loadCourses$
      .pipe(
        map(courses => courses.filter(course => course.category == "ADVANCED"))
      );
  }

}




