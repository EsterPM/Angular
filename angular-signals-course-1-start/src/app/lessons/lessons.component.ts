import {Component, ElementRef, inject, signal, viewChild} from '@angular/core';
import {LessonsService} from "../services/lessons.service";
import {Lesson} from "../models/lesson.model";
import {LessonDetailComponent} from "./lesson-detail/lesson-detail.component";

@Component({
    selector: 'lessons',
    imports: [
        LessonDetailComponent
    ],
    templateUrl: './lessons.component.html',
    styleUrl: './lessons.component.scss'
})
export class LessonsComponent {

  //Signal per controlar si estem en la vista "master" o "detail"
  mode = signal<'master' | 'detail'>("master");
  lessons = signal<Lesson[]>([]);
  selectedLesson = signal<Lesson | null>(null);
  lessonsService = inject(LessonsService);

  //Obtenim una referència al camp d'entrada de cerca amb #search
  searchInput = viewChild.required<ElementRef>('search');


  async onSearch() {
    //Obtenim el valor que l'usuari ha escrit al camp de cerca
    const query = this.searchInput()?.nativeElement.value;
    console.log('search query', query);

  }

}
