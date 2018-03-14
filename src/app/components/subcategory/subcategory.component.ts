import { Component, OnInit, Injectable, Input } from '@angular/core';
import { Location } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { CurrentSubcategoriesService } from '../../services/subcategory/currentSubcategory.service';
import { AllSubcategoriesService } from '../../services/subcategory/allSubcategories.service';

@Component({
  selector: 'subcategory',
  templateUrl: 'subcategory.component.html',
  styleUrls: ['subcategory.scss'],
})

@Injectable()
export class SubcategoryComponent implements OnInit {
  @Input() page: string;

  public title: string;
  items: any = [];
  constructor(
    private router: Router,
    private currentSubcatService: CurrentSubcategoriesService,
    private allSubcatService: AllSubcategoriesService,
  ) {
    router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
        this.title = event.url.split('/')[3];
      }
    });
  }

  ngOnInit(): void {
    const subcategories = this.allSubcatService.getSubCat(this.page);
    this.currentSubcatService.currentSubcategories$.next(subcategories);

  }
}
