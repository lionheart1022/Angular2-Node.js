import { SelectedSubcategoriesService } from './../../services/subcategory/selectedSubCategory.service';
import { CurrentSubcategoriesService } from './../../services/subcategory/currentSubcategory.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: '[app-left-menu]',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.scss']
})
export class LeftMenuComponent implements OnInit {
  subcategories: any[];
  selectedSubcategory: string;
  constructor(
    private currentSubcatService: CurrentSubcategoriesService,
    private selectedSubcatService: SelectedSubcategoriesService
  ) { }
  ngOnInit() {
    this.currentSubcatService.currentSubcategories$.subscribe((data) => {
      this.subcategories = data;
    });

    this.selectedSubcatService.selectedSubcategories$.subscribe((data) => {
      this.selectedSubcategory = data;
    });
  }

  selectItem(item: string) {
    this.selectedSubcategory = item;
  }

}
