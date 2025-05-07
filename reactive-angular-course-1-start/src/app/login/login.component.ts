import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


import { Router } from '@angular/router';
import { AuthStore } from '../services/auth.store';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: false
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthStore) {

    this.form = fb.group({
      email: ['test@angular-university.io', [Validators.required]],
      password: ['test', [Validators.required]]
    });

  }

  ngOnInit() {

  }

  login() {
    //S'obtenen els valors del formulari
    const val = this.form.value;

    //Es crida al mètode login del servei d'autenticació
    this.auth.login(val.email, val.password)
      .subscribe(
        () => {
          //Si el login té èxit, es redirigeix a la pàgina de cursos
          this.router.navigateByUrl("/courses")
        },
        err => {
          alert("Login failed!");
        }
      );
  }
}
