import { Component, OnInit } from '@angular/core';
import { Course } from '../model/course';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
  standalone: false
})
export class CourseComponent implements OnInit {

  course: Course;

  couponCode: string;

  //ActivatedRoute Serveix per accedir a Paràmetres de ruta (:courseUrl) i Dades resoltes (resolve)
  constructor(private route: ActivatedRoute) {

  }

  ngOnInit() {
    //extreu el resultat que ha retornat el CourseResolver
    this.course = this.route.snapshot.data["course"];
  }

  confirmExit() {
    return confirm(`Are you sure you want to exit ${this.course.description}?`)
  }
}











