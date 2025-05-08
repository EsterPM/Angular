import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../model/course';
import {
  debounceTime,
  distinctUntilChanged,
  startWith,
  tap,
  delay,
  map,
  concatMap,
  switchMap,
  withLatestFrom,
  concatAll, shareReplay, catchError
} from 'rxjs/operators';
import { merge, fromEvent, Observable, concat, throwError, combineLatest } from 'rxjs';
import { Lesson } from '../model/lesson';
import { CoursesService } from '../services/courses.service';

interface CourseData {
  course: Course;
  lessons: Lesson[];
}

@Component({
  selector: 'course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class CourseComponent implements OnInit {

  data$: Observable<CourseData>;

  constructor(private route: ActivatedRoute,
    private coursesService: CoursesService) {


  }

  ngOnInit() {
    const courseId = parseInt(this.route.snapshot.paramMap.get("courseId"));

    //Observable que carrega un curs pel seu ID, començant amb un valor null mentre es carrega
    const course$ = this.coursesService.loadCourseById(courseId)
      .pipe(
        startWith(null)
      );

    //Observable que carrega totes les lliçons d'un curs, començant amb un array buit
    const lessons$ = this.coursesService.loadAllCourseLessons(courseId)
      .pipe(
        startWith([])
      );

    //Combina els dos observables: course$ i lessons$
    this.data$ = combineLatest([course$, lessons$])
      .pipe(
        //Mapeja els resultats combinats en un objecte amb les propietats "course" i "lessons"
        map(([course, lessons]) => {
          return {
            course,
            lessons
          }
        }),
        tap(console.log)
      );
  }
}











