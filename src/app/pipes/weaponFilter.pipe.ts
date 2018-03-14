import { Pipe, PipeTransform } from '@angular/core';
import { Weapon } from '../interfaces/index';

@Pipe({
  name: 'matchesType'
})
export class WeaponFilterPipe implements PipeTransform {
  transform(items: Weapon[], type: string): Array<Weapon> {
    if (!items) {
      return items;
    }
    return items.filter(item => item.type === type);
  }
}
