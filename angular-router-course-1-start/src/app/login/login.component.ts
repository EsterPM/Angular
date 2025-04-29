import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, RouteConfigLoadEnd, RouteConfigLoadStart, Router } from '@angular/router';
import { LoadingService } from './../shared/loading/loading.service';
import {Component, Input, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';


import {AuthStore} from '../services/auth.store';

//activar un indicador de càrrega (loading) mentre es carrega o canvia una ruta.

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    standalone: false
})
export class LoginComponent implements OnInit {

  //form: UntypedFormGroup;

  @Input()
  routing: boolean = false;

  @Input()
  detectRoutingOngoing = false;

  constructor(
    public loadingService: LoadingService,
    //private fb: UntypedFormBuilder,
    private router: Router,
    //private auth: AuthStore
    ) {

    /*this.form = fb.group({
      email: ['test@angular-university.io', [Validators.required]],
      password: ['test', [Validators.required]]
    });*/

  }

  ngOnInit() {
    //Escolta els esdeveniments del Router, però només si detectRoutingOngoing === true.
    if (this.detectRoutingOngoing) {
      this.router.events
        .subscribe(
          event => {
            //Activa el loading quan: comença la navegacio o es comença a carregar un mòdul amb lazy loading (RouteConfigLoadStart)
            if (event instanceof NavigationStart || event instanceof RouteConfigLoadStart) {
              this.loadingService.loadingOn();
            }
            //Desactiva el loading
            else if (event instanceof NavigationEnd ||
                event instanceof NavigationError ||
                event instanceof NavigationCancel ||
                event instanceof RouteConfigLoadEnd) {
                  this.loadingService.loadingOff();
                }
          }
        )
    }
  }

  /*login() {

    const val = this.form.value;

    this.auth.login(val.email, val.password)
        .subscribe(
            () => {},
            err => {
                alert("Login failed!");
            }
        );
  }*/

}
