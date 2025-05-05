import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Course } from "../model/course";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { openEditCourseDialog } from '../course-dialog/course-dialog.component';
import { filter } from 'rxjs/operators';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'courses-card-list',
  templateUrl: './courses-card-list.component.html',
  styleUrls: ['./courses-card-list.component.css'],
  standalone: false
})
export class CoursesCardListComponent implements OnInit {

  @Input()
  courses: Course[];

  //Responsive
  cols = 1;
  rowHeight = '500px';
  handsetPortrait = false; //booleà per saber si estem en mòbil vertical


  //MatDialog per obrir diàlegs. //BreakpointObserver per detectar els canvis de mida/dispositiu.
  constructor(private dialog: MatDialog, private responsive: BreakpointObserver) {
  }


  ngOnInit() {
    //Escolta els breakpoints predeterminats de @angular/cdk/layout, que identifiquen dispositius i orientacions concretes.
    this.responsive.observe([
      Breakpoints.TabletPortrait,
      Breakpoints.TabletLandscape,
      Breakpoints.HandsetPortrait,
      Breakpoints.HandsetLandscape
    ])
      .subscribe(result => {
        //Valors per defecte
        this.cols = 3;
        this.rowHeight = "500px";
        this.handsetPortrait = false;

        const breakpoints = result.breakpoints;

        //Tablet en vertical
        if (breakpoints[Breakpoints.TabletPortrait]) {
          this.cols = 1;
        }
        //Mòbil en vertical
        else if (breakpoints[Breakpoints.HandsetPortrait]) {
          this.cols = 1;
          this.rowHeight = "430px";
          this.handsetPortrait = true;
        }
        //Mòbil en horitzontal
        else if (breakpoints[Breakpoints.HandsetLandscape]) {
          this.cols = 1;
        }
        //Tablet en horitzontal
        else if (breakpoints[Breakpoints.TabletLandscape]) {
          this.cols = 2;
        }
      });
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









