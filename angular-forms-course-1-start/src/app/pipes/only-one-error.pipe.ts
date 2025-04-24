import { Pipe, PipeTransform } from '@angular/core';

/*rep tots els errors d'un control de formulari
i una llista de prioritats d'errors,
i et retorna només el primer error que troba segons l'ordre de la llista.
*/
@Pipe({
  name: 'onlyOneError',
  standalone: false
})
export class OnlyOneErrorPipe implements PipeTransform {

  transform(allErrors: any, errorsPriority: string[]): any {

    if (!allErrors) {
      return null;
    }

    //Es prepara un objecte on es guardarà només un error.
    const onlyOneError: any = {};

    //Recorre la llista d'errors en l'ordre donat.
    for (let error of errorsPriority) {
      //Quan troba un error que existeix, l'afegeix a onlyOneError i atura la cerca.
      if (allErrors[error]) {
        onlyOneError[error] = allErrors[error];
        break;
      }
    }

    return onlyOneError;
  }

}
