import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'leave',
})
export class LeavePipe implements PipeTransform {
  transform(value: string): unknown {
    const d = new Date(value);
    return d.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  }
}
