import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable()
export class SelectedSubcategoriesService {

  public selectedSubcategories$: Subject<string> = new Subject<string>();

  constructor(
  ) { }
}
