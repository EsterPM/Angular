import {Component, inject} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {MessagesService} from "../messages/messages.service";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";

@Component({
    selector: 'login',
    imports: [
        RouterLink,
        ReactiveFormsModule
    ],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent {

  fb = inject(FormBuilder);

  form = this.fb.group({
    email: [''],
    password: ['']
  });

  messagesService = inject(MessagesService);

  authService = inject(AuthService);

  //Permet navegar a una altra ruta
  router = inject(Router);

  async onLogin() {
    try {
      const {email, password} = this.form.value;
      //si algun dels dos camps és buit, mostrem un missatge d'error i sortim de la funció.
      if (!email || !password) {
        this.messagesService.showMessage(
          "Enter an email and password.",
          "error"
        )
        return;
      }
      //Cridem al servei d'autenticació per fer login amb les credencials introduïdes.
      await this.authService.login(email, password);
      //Si el login és correcte, redirigim l'usuari a la pàgina d'inici.
      await this.router.navigate(['/home']);
    }
    catch(err) {
      console.error(err);
      this.messagesService.showMessage(
        "Login failed, please try again",
        "error"
      )
    }
  }
}
