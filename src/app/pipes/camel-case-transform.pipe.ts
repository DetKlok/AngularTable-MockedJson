import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'camelCaseTransform'
})
export class CamelCaseTransformPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    const result = value.replace(/([A-Z])/g, " $1");
    const finalResult = result.charAt(0).toUpperCase() + result.slice(1);
    return finalResult;
  }

}
