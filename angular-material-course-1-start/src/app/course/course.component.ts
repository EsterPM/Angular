import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Course } from "../model/course";
import { CoursesService } from "../services/courses.service";
import { debounceTime, distinctUntilChanged, startWith, tap, delay, catchError } from 'rxjs/operators';
import { merge, fromEvent, throwError } from "rxjs";
import { Lesson } from '../model/lesson';


@Component({
  selector: 'course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
  standalone: false
})
export class CourseComponent implements OnInit, AfterViewInit {

  course: Course;

  lessons: Lesson[];

  constructor(private route: ActivatedRoute,
    private coursesService: CoursesService) {

  }

  //Variable per la taula
  displayedColumns = ['seqNo', "description", "duration"];

  ngOnInit() {

    this.course = this.route.snapshot.data["course"];

    this.loadLessonsPage();
  }

  //carrega del backend les lliçons d'un curs concret
  loadLessonsPage() {
    //obtenir les lliçons del curs amb ID, ordenades ascendentment, començant per la pàgina 0 i amb màxim 3 resultats.
    this.coursesService.findLessons(this.course.id, "asc", 0, 3)
      .pipe(
        //assigna les lliçons retornades a this.lessons
        tap(lessons => this.lessons = lessons),
        catchError(err => {
          console.log("Error loading lessons", err);
          alert("Error loading lessons");
          return throwError(err);
        })
      )
      .subscribe();
  }

  ngAfterViewInit() {


  }

}
