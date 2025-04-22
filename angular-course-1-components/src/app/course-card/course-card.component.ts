import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Course } from '../model/course';

@Component({
  selector: 'course-card',
  imports: [],
  templateUrl: './course-card.component.html',
  styleUrl: './course-card.component.css'
})
export class CourseCardComponent {

  //per rebre dades des de fora del component
  @Input()
  course: Course;

  //crea un esdeveniment de sortida personalitzat
  @Output('courseSelected') //El nom entre cometes és com es veurà des del component pare.
  courseEmitter = new EventEmitter<Course>();


  onCourseViewed() {

    console.log("Click")
    //Emet un esdeveniment amb el curs com a valor
    this.courseEmitter.emit(this.course);

  }
}
