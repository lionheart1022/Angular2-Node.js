import { Component, Input, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CurrentSubcategoriesService } from '../../../services/subcategory/currentSubcategory.service';
import { AllSubcategoriesService } from '../../../services/subcategory/allSubcategories.service';
import { ucFirst } from '../../../helpers/ucFirst/ucFirst';
import { unescape } from 'querystring';
import { SearchService } from '../../../services/search.service';
import { SelectedSubcategoriesService } from '../../../services/subcategory/selectedSubCategory.service';

@Component({
  selector: 'home',
  templateUrl: 'fraud.component.html',
  styleUrls: ['fraud.scss']
})
export class FraudComponent implements OnInit {
  public title: string;
  items: any = [];
  constructor(
    private router: Router,
    private currentSubcatService: CurrentSubcategoriesService,
    private selectedSubcatService: SelectedSubcategoriesService,
    private allSubcatService: AllSubcategoriesService,
    private searchService: SearchService,

  ) {
    router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
        this.searchService.weapons.next([]);
        this.title = event.url.split("/")[3];
        if (this.title === 'cc%26vv') {
          this.title = 'CC&VV';
        } else if (this.title === 'documents%26Data') {
          this.title = 'Documents & Data';
        } else {
          // this.title = unescape(this.title);
          this.title = ucFirst(this.title);
        }
        this.items = [];
      }
    });
  }

  ngOnInit(): void {
    this.selectedSubcatService.selectedSubcategories$.next(this.title);
    const subcategories = this.allSubcatService.getSubCat('fraud');
    this.currentSubcatService.currentSubcategories$.next(subcategories);

  }
}
