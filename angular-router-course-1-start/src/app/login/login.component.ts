import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, RouteConfigLoadEnd, RouteConfigLoadStart, Router } from '@angular/router';
import { LoadingService } from './../shared/loading/loading.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';


import { AuthStore } from '../services/auth.store';

//activar un indicador de càrrega (loading) mentre es carrega o canvia una ruta.

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: false
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  @Input()
  routing: boolean = false;

  @Input()
  detectRoutingOngoing = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthStore
  ) {

    this.form = fb.group({
      email: ['test@angular-university.io', [Validators.required]],
      password: ['test', [Validators.required]]
    });

  }

  ngOnInit() {

  }

  login() {

    //Obtiene los valores del formulario
    const val = this.form.value;

    //Llama al servicio de autenticación:
    this.auth.login(val.email, val.password)
      .subscribe(
        //En caso de éxito, redirige al usuario a /courses
        () => {
          this.router.navigateByUrl('/courses')
        },
        err => {
          alert("Login failed!");
        }
      );
  }
}
