import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function futureDateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) return null;

    const today = new Date();
    const selected = new Date(value);

    today.setHours(0, 0, 0, 0);
    selected.setHours(0, 0, 0, 0);

    return selected < today ? { pastDate: true } : null;
  };
}
