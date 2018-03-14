import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ITargetFilter } from '../../../interfaces';

@Component({
  selector: 'app-targets-search',
  templateUrl: './targets-search.component.html',
  styleUrls: ['./targets-search.component.scss']
})
export class TargetsSearchComponent implements OnInit {
  @Output() onSearch = new EventEmitter<object>();
  searchData: ITargetFilter;

  constructor() { }

  ngOnInit() {
  }

  search() {
    this.onSearch.emit(this.searchData);
  }

}
