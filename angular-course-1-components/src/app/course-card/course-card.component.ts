import { Component, Input } from '@angular/core';
import {Course} from '../model/course';

@Component({
  selector: 'course-card',
  imports: [],
  templateUrl: './course-card.component.html',
  styleUrl: './course-card.component.css'
})
export class CourseCardComponent {

  //per rebre dades des de fora del component
  @Input()
  course:Course;
}
