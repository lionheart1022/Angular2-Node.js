import { SearchFilter } from './../../interfaces/search-filter.interface';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  @Output() onApplyFilter = new EventEmitter<object>();

  shipFrom: any[] = [
    { value: 1, viewValue: 'shipFrom1' },
    { value: 2, viewValue: 'shipFrom2' },
  ];

  shipTo: any[] = [
    { value: 1, viewValue: 'shipTo1' },
    { value: 2, viewValue: 'shipTo2' },
  ];

  escRows: any[] = [
    { value: 1, viewValue: 'escRow1' },
    { value: 2, viewValue: 'escRow2' },
  ];

  categories: any[] = [
    { value: 1, viewValue: 'category1' },
    { value: 2, viewValue: 'category2' },
  ];

  currencies: any[] = [
    { value: 'EUR', viewValue: 'EUR' },
  ];

  sortBy: any[] = [
    { value: 1, viewValue: 'sortBy1' },
    { value: 2, viewValue: 'sortBy2' },
  ];

  vender: any[] = [
    { value: 1, viewValue: 'vender1' },
    { value: 2, viewValue: 'vender2' },
  ];

  filterData: SearchFilter = {
    shipsFrom: this.shipFrom[0].value,
    shippingTo: this.shipTo[0].value,
    escrow: this.escRows[0].value,
    category: this.categories[0].value,
    currencyFilter: this.currencies[0].value,
    priceFrom: 0,
    priceTo: 20,
    sortBy: this.sortBy[0].value,
    vendorSelect: this.vender[0].value,
  };

  constructor(private notificationService: NotificationsService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.onApplyFilter.emit(this.filterData);
    this.notificationService.success(
      'Success',
      'The filter has applied',
    );
  }

}
