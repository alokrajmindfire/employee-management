import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function futureDateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const selectedDate = new Date(control.value);
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    if (!control.value) return null;

    return selectedDate < today ? { pastDate: true } : null;
  };
}
