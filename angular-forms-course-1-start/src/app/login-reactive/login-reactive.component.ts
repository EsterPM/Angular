import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { createPasswordStrenghtValidator } from '../validators/password-strength.validator';


@Component({
    selector: 'login',
    templateUrl: './login-reactive.component.html',
    styleUrls: ['./login-reactive.component.css'],
    standalone: false
})
export class LoginReactiveComponent implements OnInit {

  /*
  * FormGroup: representa el formulari sencer.
  * FormControl: representa cada camp individual.
  * validators: array de validacions per cada camp
  */
  form = new FormGroup({
    email: new FormControl('', {validators: [Validators.required, Validators.email], updateOn: 'blur'}),
    password: new FormControl('', {validators: [Validators.required, Validators.minLength(8), createPasswordStrenghtValidator()]})
  });

  constructor() {


  }

  ngOnInit() {

  }

}
