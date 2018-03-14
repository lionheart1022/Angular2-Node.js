import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'vendorRating'
})
export class VendorRatingPipe implements PipeTransform {
  transform(ratings: any[], type: string): number | string {
    if (!ratings) {
      return 'n/a';
    }
    const starsSum = ratings.reduce((result, rating) => result + rating.stars, 0);
    return (starsSum / ratings.length).toFixed(2);
  }
}
