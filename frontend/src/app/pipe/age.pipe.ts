import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'age',
})
export class AgePipe implements PipeTransform {
  transform(dob: string): number {
    let date = new Date(dob);
    let diff_ms = Date.now() - date.getTime();
    let age_date = new Date(diff_ms);

    return Math.abs(age_date.getUTCFullYear() - 1970);
  }
}
