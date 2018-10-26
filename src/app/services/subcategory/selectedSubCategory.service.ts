import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable()
export class SelectedSubcategoriesService {

  public selectedSubcategories$: BehaviorSubject<any> = new BehaviorSubject<any>({});

  constructor(
  ) { }
}
