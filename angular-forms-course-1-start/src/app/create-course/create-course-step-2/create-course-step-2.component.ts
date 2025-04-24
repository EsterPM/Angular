import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'create-course-step-2',
  templateUrl: 'create-course-step-2.component.html',
  styleUrls: ['create-course-step-2.component.scss'],
  standalone: false
})
export class CreateCourseStep2Component implements OnInit {

  form = this.fb.group({
    courseType: ['premium', Validators.required],
    price: [null, [
      Validators.required,
      Validators.min(1),
      Validators.max(9999),
      Validators.pattern("[0-9]+")
    ]],
  });

  constructor(private fb: FormBuilder) {

  }

  ngOnInit() {
    //valueChanges és un observable que emet un valor cada vegada que canvia alguna dada dins del formulari.
    this.form.valueChanges
      .subscribe(val => {
        const priceControl = this.form.controls["price"];

        //Si el curs és gratuït, deshabilitem el camp de preu
        if (val.courseType == 'free' && priceControl.enabled) {
          priceControl.disable({ emitEvent: false }); //{ emitEvent: false } s'utilitza per evitar que el canvi en l'estat del control (disabled) emeti un nou esdeveniment que podria desencadenar canvis addicionals, com les validacions de formulari.
        }
        //Si el curs és premium, habilitem el camp de preu
        else if (val.courseType == 'premium' && priceControl.disabled) {
          priceControl.enable({ emitEvent: false });
        }

      });
  }
}
