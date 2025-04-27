import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CoursesService } from '../../services/courses.service';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { courseTitleValidator } from '../../validators/course-title.validator';

interface CourseCategory {
  code: string;
  description: string;
}

@Component({
  selector: 'create-course-step-1',
  templateUrl: './create-course-step-1.component.html',
  styleUrls: ['./create-course-step-1.component.scss'],
  standalone: false
})
export class CreateCourseStep1Component implements OnInit {

  form = this.fb.group({
    title: ['', {
      validators: [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(60)
      ],
      asyncValidators: [courseTitleValidator(this.courses)],
      updateOn: 'blur'
    }],
    releasedAt: [new Date(), Validators.required], //Un valor inicial que és la data actual
    category: ['BEGINNER', Validators.required],
    downloadsAllowed: [false, Validators.requiredTrue], //El valor inicial és false (la casella de verificació està desmarcada per defecte)
    longDescription: ['', [Validators.required, Validators.minLength(3)]],
    address: [null, Validators.required] //Form dins a form
  });

  //Obtenció de les categories del curs
  courseCategories$: Observable<CourseCategory[]>;

  constructor(private fb: FormBuilder, private courses: CoursesService) {

  }

  ngOnInit() {
    // retorna un array de categories per mostrar-lo al formulari
    this.courseCategories$ = this.courses.findCourseCategories();


    //Permet que les dades del formulari es conservin encara que es cambi de pàgina
    //Intenta obtenir el valor emmagatzemat al localStorage amb la clau "STEP_1". Si existeixen dades prèviament emmagatzemades, la variable draft contindrà el valor corresponent.
    const draft = localStorage.getItem("STEP_1");

    //Carregar les dades en el formulari
    if (draft) {
      this.form.setValue(JSON.parse(draft));
    }

    //Guardant les dades quan el formulari és vàlid
    this.form.valueChanges
      .pipe(
        filter(() => this.form.valid)
      )
      .subscribe(val => localStorage.setItem("STEP_1", JSON.stringify(val)));
  }

  //facilita accedir al control des del HTML.
  get courseTitle() {
    return this.form.controls['title'];
  }
}
