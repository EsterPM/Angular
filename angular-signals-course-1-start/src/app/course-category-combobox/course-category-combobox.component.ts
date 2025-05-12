import { Component, contentChild, effect, ElementRef, input, model } from '@angular/core';
import { CourseCategory } from "../models/course-category.model";

@Component({
  selector: 'course-category-combobox',
  standalone: true,
  imports: [],
  templateUrl: './course-category-combobox.component.html',
  styleUrl: './course-category-combobox.component.scss'
})
export class CourseCategoryComboboxComponent {

  //Declarem un input requerit de tipus string, que s'utilitza per mostrar l'etiqueta del <label> del combobox.
  label = input.required<string>();

  //Declarem un model requerit que representa la categoria seleccionada.
  value = model.required<CourseCategory>();

  //recuperant el div amb #title des de dins del component.
  title = contentChild<ElementRef>("title");

  constructor() {
    effect(() => {
      console.log("title: ", this.title());
    });
  }

  //s'executa quan l'usuari canvia l'opció seleccionada del combobox.
  onCategoryChanged(category: string) {
    this.value.set(category as CourseCategory); //Converteix el valor (string) a CourseCategory i el desa en el model (value.set(...)).
  }
}


//viewChild =	Elements que són dins la plantilla del component
//contentChild = Elements projectats des de fora (via ng-content)
//contentChildren = + d'un element
