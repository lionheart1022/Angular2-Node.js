import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { UUID } from 'angular2-uuid';

import { Weapon } from '../../../interfaces/index';
import { SearchService } from '../../../services/index';
import { ModalService } from '../../../services/modal.service';
import { AllSubcategoriesService } from '../../../services/subcategory/allSubcategories.service';
import { CurrentSubcategoriesService } from '../../../services/subcategory/currentSubcategory.service';
import {ucFirst} from "../../../helpers/ucFirst/ucFirst";
import {SelectedSubcategoriesService} from "../../../services/subcategory/selectedSubCategory.service";

@Component({
  selector: 'weapons',
  templateUrl: 'weapons.component.html',
  styleUrls: ['weapons.scss']
})

export class WeaponsComponent implements OnInit {
  activated: boolean = false;
  errorMessage: string;
  requestId: string;
  searchString: string;
  searchBlock: boolean = false;
  selectedWeapon: Weapon;
  type: string = 'DreamMarketProductItem';
  public weapons: Weapon[] = [];
  public title: string = 'Weapons';
  public url: string = '';
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
        this.selectedSubcatService.selectedSubcategories$.next(this.title);
        this.title = ucFirst(this.title);
        this.items = [];
      }
    });
  }

  ngOnInit(): void {
    const subcategories = this.allSubcatService.getSubCat('weapons');
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
