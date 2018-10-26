import { Pipe, PipeTransform } from '@angular/core';
import { UserDetail } from './../interfaces/users/user-detail.interface';

@Pipe({
  name: 'sortingUsers'
})
export class SortingUsersPipe implements PipeTransform {
  transform(users: UserDetail[], path: string[], order: number): UserDetail[] {
    if (!users || !path || !order) return users;

    return users.sort((a: UserDetail, b: UserDetail) => {
      // We go for each property followed by path
      path.forEach(property => {
        a = a[property];
        b = b[property];
      })

      // Order * (-1): We change our order
      return a > b ? order : order * (- 1);
    })
  }
}
