import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

//Crea una funció de validació (ValidatorFn) que verifica si una contrasenya compleix aquests requisits:
export function createPasswordStrenghtValidator(): ValidatorFn {

  return (control:AbstractControl) : ValidationErrors | null => {
    const value = control.value;

    //Si no té valor encara
    if (!value) {
      return null;
    }

    //Té almenys una lletra majúscula
    const hasUpperCase = /[A-Z]+/.test(value);
    //Té almenys una lletra minúscula
    const hasLowerCase = /[a-z]+/.test(value);
    //Té almenys un número
    const hasNumeric = /[0-9]+/.test(value);

    const passwordValid = hasUpperCase && hasLowerCase && hasNumeric;

    //Retorna: null si la contrasenya és vàlida (per Angular, això vol dir cap error).
    //{ passwordStrength: true } si no és vàlida.
    return !passwordValid ? {passwordStrength:true}: null;
  }
}
