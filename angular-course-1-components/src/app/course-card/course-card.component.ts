import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Course } from '../model/course';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'course-card',
  standalone: true, //Afegit perque no funcionava els ng
  imports: [CommonModule], ////Afegit perque no funcionava els ng
  templateUrl: './course-card.component.html',
  styleUrl: './course-card.component.css'
})
export class CourseCardComponent {

  //per rebre dades des de fora del component
  @Input()
  course: Course;

  @Input()
  index: number;

  //crea un esdeveniment de sortida personalitzat
  @Output('courseSelected') //El nom entre cometes és com es veurà des del component pare.
  courseEmitter = new EventEmitter<Course>();


  onCourseViewed() {
    console.log("Click")
    //Emet un esdeveniment amb el curs com a valor
    this.courseEmitter.emit(this.course);
  }

  //afegir una classe CSS al teu component HTML amb ngClass
  cardClasses() {
    if (this.course.category == 'BEGINNER') {
      return 'beginner';
    } else {
      return '';
    }
  }

  //Aplicar estils amb ngStyle
  cardStyles() {
    return {
      'background-image': 'url(' + this.course.iconUrl + ')'};
  }
}
