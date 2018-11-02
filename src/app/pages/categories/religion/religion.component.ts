import { Component, Input } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CurrentSubcategoriesService } from '../../../services/subcategory/currentSubcategory.service';
import { AllSubcategoriesService } from '../../../services/subcategory/allSubcategories.service';
import { ucFirst } from '../../../helpers/ucFirst/ucFirst';
import { SearchService } from '../../../services/search.service';
import { SelectedSubcategoriesService } from '../../../services/subcategory/selectedSubCategory.service';

@Component({
  selector: 'home',
  templateUrl: 'religion.component.html',
  styleUrls: ['religion.scss']
})
export class ReligionComponent {
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
        this.title = event.url.split('/')[3];
        this.title = ucFirst(this.title);
        this.items = [];
      }
    });
  }

  ngOnInit(): void {
    const subcategories = this.allSubcatService.getSubCat('religion');
    if(typeof this.title === 'undefined') {
      this.title = 'all';
    }
    let subcategory = {name: this.title};
    subcategories.map((item) => {
      if(item['name'].toLowerCase() === this.title.toLowerCase()) {
        subcategory = item;
      }
    });
    this.selectedSubcatService.selectedSubcategories$.next(subcategory);
    this.currentSubcatService.currentSubcategories$.next(subcategories);
  }
}