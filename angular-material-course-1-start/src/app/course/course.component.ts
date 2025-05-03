import { Lesson } from './../model/lesson';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Course } from "../model/course";
import { CoursesService } from "../services/courses.service";
import { debounceTime, distinctUntilChanged, startWith, tap, delay, catchError, finalize } from 'rxjs/operators';
import { merge, fromEvent, throwError } from "rxjs";
import { SelectionModel } from '@angular/cdk/collections';


@Component({
  selector: 'course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
  standalone: false
})
export class CourseComponent implements OnInit, AfterViewInit {

  course: Course;

  lessons: Lesson[] = [];

  loading = false;

  //per capturar el paginator
  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  @ViewChild(MatSort)
  sort: MatSort

  //crear una instància de la classe SelectionModel per gestionar la selecció d'elements de tipus Lesson dins d'una taula
  selection = new SelectionModel<Lesson>(true, []);

  constructor(private route: ActivatedRoute,
    private coursesService: CoursesService) {

  }

  //Variable per la taula
  displayedColumns = ['select', 'seqNo', "description", "duration"];

  expandedLesson: Lesson

  ngOnInit() {

    this.course = this.route.snapshot.data["course"];

    this.loadLessonsPage();
  }


  //Afegeix o elimina la lliçó de la selecció i mostra les seleccionades per consola
  onLessonToggled(lesson:Lesson) {
    this.selection.toggle(lesson);
    console.log(this.selection.selected);
  }

  //carrega del backend les lliçons d'un curs concret
  loadLessonsPage() {
    //iniciar el spin de carga
    this.loading = true;

    //obtenir les lliçons del curs amb ID, ordenades ascendentment, començant per la pàgina 0 i amb màxim 3 resultats.
    this.coursesService.findLessons(this.course.id, this.sort?.direction ?? "asc",
      this.paginator?.pageIndex ?? 0, this.paginator?.pageSize ?? 3,
      this.sort?.active ?? "seqNo")
      .pipe(
        //assigna les lliçons retornades a this.lessons
        tap(lessons => this.lessons = lessons),
        catchError(err => {
          console.log("Error loading lessons", err);
          alert("Error loading lessons");
          return throwError(err);
        }),
        //Finalitza el spin de carga
        finalize(() => this.loading = false)
      )
      .subscribe();
  }

  //expandir o contraure una lliçó específica
  onToggleLesson(lesson: Lesson) {
    if (lesson == this.expandedLesson) {
      this.expandedLesson = null; // Si ja està expandida, la contrau
    }
    else {
      this.expandedLesson = lesson; // Si no, l'expandeix
    }
  }

  //per escoltar els canvis de pàgina
  ngAfterViewInit() {

    //Resetejar la paginació
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    //Combinar els dos
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => this.loadLessonsPage())
      )
      .subscribe()
  }

  //Retorna true si totes les lliçons estan seleccionades.
  isAllSelected() {
    return this.selection.selected?.length == this.lessons?.length;
  }


  //Si totes estan seleccionades, les desselecciona totes.
  toggleAll() {
    if (this.isAllSelected()) {
      this.selection.clear();
    }
    //Si no, selecciona totes les lliçons usant l'operador d'expansió (...) per passar-les com arguments.
    else {
      this.selection.select(...this.lessons);
    }
  }
}
