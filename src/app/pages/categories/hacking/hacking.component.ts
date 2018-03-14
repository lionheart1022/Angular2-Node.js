import { Component, Input, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CurrentSubcategoriesService } from '../../../services/subcategory/currentSubcategory.service';
import { AllSubcategoriesService } from '../../../services/subcategory/allSubcategories.service';
import { ucFirst } from '../../../helpers/ucFirst/ucFirst';
import { SearchService } from '../../../services/search.service';
import { SelectedSubcategoriesService } from '../../../services/subcategory/selectedSubCategory.service';

@Component({
  selector: 'home',
  templateUrl: 'hacking.component.html',
  styleUrls: ['hacking.scss']
})

export class HackingComponent implements OnInit {


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
        this.title = ucFirst(this.title);
        this.items = [];
      }
    });
  }

  ngOnInit(): void {

    const subcategories = this.allSubcatService.getSubCat('hacking');
    this.selectedSubcatService.selectedSubcategories$.next(this.title);
    this.currentSubcatService.currentSubcategories$.next(subcategories);

  }
}
