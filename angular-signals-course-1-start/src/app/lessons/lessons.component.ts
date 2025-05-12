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
    const results =
      await this.lessonsService.loadLessons({query});
    this.lessons.set(results);
  }

  //Quan l'usuari selecciona una lliçó, canviem al mode "detail" i guardem la lliçó seleccionada.
  onLessonSelected(lesson: Lesson) {
    this.mode.set("detail");
    this.selectedLesson.set(lesson);
  }

  //Quan l'usuari cancel·la, tornem al mode "master" (vista general de la llista).
  onCancel() {
    this.mode.set("master");
  }

  onLessonUpdated(lesson: Lesson) {
    this.lessons.update(lessons =>
      lessons.map(l => l.id === lesson.id ? lesson : l) //Substitueix la lliçó amb el mateix id per la nova actualitzada
    );
  }
}
