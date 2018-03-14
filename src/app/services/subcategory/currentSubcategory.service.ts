import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable()
export class CurrentSubcategoriesService {

  public currentSubcategories$: Subject<any[]> = new Subject<any[]>();

  constructor(
  ) { }
}
