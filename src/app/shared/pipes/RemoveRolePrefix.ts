import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'removeRolePrefix' })
export class RemoveRolePrefixPipe implements PipeTransform {
  transform(value: string): string {
    const valueToReturn = value.slice(5);
     return valueToReturn;
  }
}
