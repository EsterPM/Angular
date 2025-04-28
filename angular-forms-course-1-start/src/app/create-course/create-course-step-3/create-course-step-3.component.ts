import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'create-course-step-3',
  templateUrl: 'create-course-step-3.component.html',
  styleUrls: ['create-course-step-3.component.scss'],
  standalone: false
})
export class CreateCourseStep3Component {

  form = this.fb.group({
    lessons: this.fb.array([])
  });

  constructor(private fb: FormBuilder) {

  }

  get lessons() {
    return this.form.controls["lessons"] as FormArray;
  }

  //Es crea un nou FormGroup i s'afegeix dins de l'Array
  addLesson() {
    const lessonForm = this.fb.group({
      title: ['', Validators.required],
      level: ['beginner', Validators.required]
    });

    this.lessons.push(lessonForm);
  }

  //Elimina la lliçó en la posició i
  deleteLesson(lessonIndex: number) {
    this.lessons.removeAt(lessonIndex);
  }
}
