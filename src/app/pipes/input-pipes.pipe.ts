import { Pipe, PipeTransform } from '@angular/core';


@Pipe({name: 'dataMask'})
export class dataMaskPipe implements PipeTransform {
  transform(value: any, ...args: any[]) {
    return [/[0-9]/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
  }
  data() {
    
  }
}