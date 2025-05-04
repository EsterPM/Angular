import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Course } from "../model/course";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { openEditCourseDialog } from '../course-dialog/course-dialog.component';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'courses-card-list',
  templateUrl: './courses-card-list.component.html',
  styleUrls: ['./courses-card-list.component.css'],
  standalone: false
})
export class CoursesCardListComponent implements OnInit {

  @Input()
  courses: Course[];

  constructor(private dialog: MatDialog) {
  }

  ngOnInit() {

  }

  //editar un curs obrint un diàleg, i després capturar els valors modificats si l'usuari fa clic a "Guardar"
  editCourse(course: Course) {

    //Obre el diàleg de formulari usant la funció
    openEditCourseDialog(this.dialog, course)
      .pipe(
        //Filtra el resultat retornat
        filter(val => !!val)
      )
      //Quan el diàleg es tanca i es retorna un objecte vàlid
      .subscribe(
        val => console.log("new course value:", val)
      );
  }
}









