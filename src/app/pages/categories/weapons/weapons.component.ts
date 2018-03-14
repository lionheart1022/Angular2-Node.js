import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { UUID } from 'angular2-uuid';

import { Weapon } from '../../../interfaces/index';
import { SearchService } from '../../../services/index';
import { ModalService } from '../../../services/modal.service';
import { AllSubcategoriesService } from '../../../services/subcategory/allSubcategories.service';
import { CurrentSubcategoriesService } from '../../../services/subcategory/currentSubcategory.service';

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
  public openModal = false;
  constructor(
    private router: Router,
    private searchService: SearchService,
    private modalService: ModalService,
    private currentSubcatService: CurrentSubcategoriesService,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
  }
}
