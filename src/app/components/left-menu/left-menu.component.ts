import { SelectedSubcategoriesService } from './../../services/subcategory/selectedSubCategory.service';
import { CurrentSubcategoriesService } from './../../services/subcategory/currentSubcategory.service';
import { Component, OnInit } from '@angular/core';
import {AllSubcategoriesService} from "../../services/subcategory/allSubcategories.service";

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
    private selectedSubcatService: SelectedSubcategoriesService,
    private allSubcatService: AllSubcategoriesService,
  ) { }

  ngOnInit() {
    this.currentSubcatService.currentSubcategories$.subscribe((data) => {
      this.subcategories = data;
    });

    this.selectedSubcatService.selectedSubcategories$.subscribe((data) => {
      this.select(data);
    });
  }

  selectItem(item: any) {
    console.log(item);
    // const subcategories = this.allSubcatService.getSubCat(item);
    // if(typeof subcategories !== 'undefined') {
    //   // console.log(subcategories);
    // }
    this.selectedSubcatService.selectedSubcategories$.next(item);
  }

  select(data) {
    if(typeof data === 'undefined') {
      data = 'all';
    }
    if(typeof data.name !== 'undefined') {
      this.selectedSubcategory = data.name;
    } else {
      this.selectedSubcategory = data;
    }
  }

}
