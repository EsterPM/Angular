import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';


@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    standalone: false
})
export class LoginComponent implements OnInit {

  //Valor per defecte
  val = {
    email: "hello@gmail.com",
    password: "123456"
  };

  constructor() {


  }

  ngOnInit() {

  }

  login(loginForm: NgForm, submit) {
    console.log(loginForm.value, loginForm.valid, submit);

    //Per comprovar la diferencia entre uni o bidimencional.
    console.log("val", this.val);
  }

  onEmailChange(change) {
    console.log(change);
  }

}
