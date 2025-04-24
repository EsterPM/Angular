import { FormGroup, ValidatorFn, Validators } from '@angular/forms';

//la data d'inici sigui anterior a la data de finalització en un període promocional.
export function createPromoRangeValidator(): ValidatorFn {
  return (form: FormGroup): Validators | null => {

    const start: Date = form.get("promoStartAt").value;
    const end: Date = form.get("promoEndAt").value;

    if (start && end) {
      //comprova si la data d'inici és anterior a la data de finalització.
      const isRangeValid = (end.getTime() - start.getTime() > 0);

      return isRangeValid ? null : { promoPeriod: true };
    }

    return null;
  }
}
