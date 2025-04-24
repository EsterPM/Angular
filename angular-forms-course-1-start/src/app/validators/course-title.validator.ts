import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { CoursesService } from '../services/courses.service';
import { map } from 'rxjs/operators';

/*
Comprova asíncronament si ja existeix un curs amb el mateix títol (description) que el que l'usuari ha escrit al formulari.
Si el troba, retorna un error ({titleExists: true}), si no, retorna null.
*/
export function courseTitleValidator(courses: CoursesService): AsyncValidatorFn {
  // Retorna una funció que rep el control (el camp que estàs validant, ex. el title).
  return (control: AbstractControl) => {
    // Fa una petició asíncrona per obtenir tots els cursos, i després els transforma amb map.
    return courses.findAllCourses()
      .pipe(
        map(courses => {

          const course = courses.find(
            course => course.description.toLowerCase()
              == control.value.toLowerCase());

          return course ? { titleExists: true } : null;

        })
      )
  }
}
