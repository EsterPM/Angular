import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { createPasswordStrenghtValidator } from '../validators/password-strength.validator';


@Component({
  selector: 'login',
  templateUrl: './login-reactive.component.html',
  styleUrls: ['./login-reactive.component.css'],
  standalone: false
})
export class LoginReactiveComponent implements OnInit {

  //Non nullable perque el valor no pugui se null i agafa el valor per defecte ""
  /*
  email: this.fb.nonNullable.control ("", {
      validators: [Validators.required, Validators.email],
      updateOn: 'blur'
    }),
  */
  form = this.fb.group({
    email: ["", {
      validators: [Validators.required, Validators.email],
      updateOn: 'blur'
    }],
    password: ['', [Validators.required, Validators.minLength(8),
    createPasswordStrenghtValidator()]]
  });

  //Si es declara aqui el non nullable serveix per tots els capms del formulari
  constructor(private fb: NonNullableFormBuilder) {


  }

  ngOnInit() {

  }

  //Per poder accedir amb el nom sense posar tota la linea
  get email() {
    return this.form.controls['email'];
  }

  get password() {
    return this.form.controls['password'];
  }

  login() {

  }

  reset() {
    this.form.reset();

    console.log(this.form.value);

  }

}
