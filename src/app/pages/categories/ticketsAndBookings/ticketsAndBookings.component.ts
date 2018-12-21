import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { CurrentSubcategoriesService } from '../../../services/subcategory/currentSubcategory.service';
import { AllSubcategoriesService } from '../../../services/subcategory/allSubcategories.service';
import { ucFirst } from '../../../helpers/ucFirst/ucFirst';
import { SearchService } from '../../../services/search.service';
import { SelectedSubcategoriesService } from '../../../services/subcategory/selectedSubCategory.service';

@Component({
  selector: 'app-ticketsAndBookings',
  templateUrl: 'ticketsAndBookings.component.html',
  styleUrls: ['ticketsAndBookings.scss']
})
export class TicketsAndBookingsComponent {
  public title: string;
  public caseId: number;
  items: any = [];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
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
    this.caseId = +this.route.snapshot.paramMap.get('id');
    const subcategories = this.allSubcatService.getSubCat('ticketsAndBookings');
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
