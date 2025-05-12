import { Component, inject, input, output } from '@angular/core';
import { Lesson } from "../../models/lesson.model";
import { ReactiveFormsModule } from "@angular/forms";
import { LessonsService } from "../../services/lessons.service";
import { MessagesService } from "../../messages/messages.service";

@Component({
  selector: 'lesson-detail',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './lesson-detail.component.html',
  styleUrl: './lesson-detail.component.scss'
})
export class LessonDetailComponent {

  //rep la lliçó a editar
  lesson = input.required<Lesson | null>();
  //quan s'ha desat la lliçó amb èxit.
  lessonUpdated = output<Lesson>();
  cancel = output();

  lessonsService = inject(LessonsService);
  messagesService = inject(MessagesService);

  onCancel() {
    this.cancel.emit();
  }

  //Intenta desar la descripció nova. Obté la lliçó actual.
  async onSave(description: string) {
    try {
      const lesson = this.lesson();
      const updatedLesson =
        await this.lessonsService.saveLesson(lesson!.id, { description }); //El ! indica que confiem que lesson no és null.
      //Emet la lliçó actualitzada al component pare.
      this.lessonUpdated.emit(updatedLesson);
    }
    catch (err) {
      console.error(err);
      this.messagesService.showMessage(`
      Error saving lesson!`, 'error')
    }

  }

}
