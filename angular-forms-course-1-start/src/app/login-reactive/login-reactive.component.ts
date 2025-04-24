import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { createPasswordStrenghtValidator } from '../validators/password-strength.validator';


@Component({
    selector: 'login',
    templateUrl: './login-reactive.component.html',
    styleUrls: ['./login-reactive.component.css'],
    standalone: false
})
export class LoginReactiveComponent implements OnInit {

  //manera més neta i concisa de crear formularis reactius a Angular amb FormBuilder
  form = this.fb.group({
    email: ["", {
      validators: [Validators.required, Validators.email],
      updateOn: 'blur'}],
    password: ['', [Validators.required, Validators.minLength(8),
                      createPasswordStrenghtValidator()]]
 });

  //Es declara al constructor
  constructor(private fb: FormBuilder) {


  }

  ngOnInit() {

  }

}
