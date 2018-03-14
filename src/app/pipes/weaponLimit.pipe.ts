import { Pipe, PipeTransform } from '@angular/core';
import { Weapon } from '../interfaces/index';

@Pipe({
  name: 'limitTo'
})
export class WeaponLimitPipe implements PipeTransform {
  transform(items: Weapon[], count: number): Array<Weapon> {
    if (!items) {
      return items;
    }
    return items.slice(0, count);
  }
}
