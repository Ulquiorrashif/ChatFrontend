import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'upCase',
  standalone: true
})
export class UpCasePipe implements PipeTransform {

  transform(value: string, ...args: any[]): string {
    return value[0].toUpperCase().concat(value.substring(1));
  }

}
