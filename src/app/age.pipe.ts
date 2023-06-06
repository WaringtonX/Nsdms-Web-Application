import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'age'
})
export class AgePipe implements PipeTransform {

  transform(value:any): unknown {
    let val = new Date(value).getFullYear();
    let today = new Date().getFullYear();
    let age2 = (today - val)
    return age2;
  }

}
