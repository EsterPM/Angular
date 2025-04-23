import { Directive } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from "@angular/forms";
import { createPasswordStrenghtValidator } from "../validators/password-strength.validator";

@Directive({
  //la fas servir amb l'atribut passwordStrength
  selector: "[passwordStrength]",
  standalone: false,
  //li dius a Angular que aquesta directiva és un validador
  providers: [{
    provide: NG_VALIDATORS, //És el que Angular fa servir per registrar validadors personalitzats.
    useExisting: PasswordStrengthDirective, //Estem dient que la directiva en si mateixa és el validador.
    multi: true //Ens permet tenir més d'un validador per un mateix camp.
  }]
})

//Aquest mètode es crida automàticament cada cop que es canvia el valor de l'input.
export class PasswordStrengthDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
      return createPasswordStrenghtValidator()(control);
  }
}


//Es crea una directiva perque et permet reutilitzar-la fàcilment en qualsevol lloc sense haver d'estar modificant TypeScript cada vegada.
//Amb la funció de validators l'hauries de cridar cada cop amb el ts.

/* --Al treballar amb ngModule
NO pots fer servir directament la funció, perquè no estàs creant els validators via TypeScript.
Aquí és on la directiva és imprescindible.
Angular detecta que hi ha una directiva amb NG_VALIDATORS i l'aplica automàticament.
*/
