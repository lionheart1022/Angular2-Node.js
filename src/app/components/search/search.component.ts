import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { UUID } from 'angular2-uuid';

import { Weapon, SearchFilter } from '../../interfaces';
import { SearchService } from '../../services';
import { ModalService } from '../../services/modal.service';
import { Subject } from 'rxjs';
import { Input } from '@angular/core';
import {TargetsService} from '../../services/targets.service';
import {ITarget} from '../../interfaces/targets/target.interface';
import {QueryService} from '../../services/query.service';

@Component({
  selector: 'app-search',
  templateUrl: 'search.component.html',
  styleUrls: ['search.scss']
})

export class SearchComponent implements OnInit, OnDestroy {
  @Input() spider: string;
  private ngUnsubscribe: Subject<boolean> = new Subject<boolean>();
  activated: boolean = false;
  errorMessage: string;
  requestId: string;
  searchString: string;
  searchBlock: boolean = false;
  filterData: string | SearchFilter = '';
  isBlockchain: boolean = false;
  public weapons: Weapon[] | string = [];
  public title: string = 'Weapons';
  public url: string = '';
  constructor(
    private router: Router,
    private searchService: SearchService,
    private modalService: ModalService,
    private targetService: TargetsService,
    private queryService: QueryService,
  ) {
  }

  ngOnInit(): void {
    this.subscribeItems();
    this.isBlockchain = new RegExp('/query/blockchain', 'ig').test(this.router.url);
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onApplyFilter(filterData: SearchFilter): void {
    this.filterData = filterData;
  }

  /**
   * Run searching
   */
  search(): void {
    this.activated = true;
    this.searchBlock = false;
    this.requestId = (UUID.UUID()).split('-').join('');
    const body = {
      searchString: this.searchString,
      blockchain: this.isBlockchain,
      requestId: this.requestId,
      filters: {
        dmfilter: this.filterData,
        tchkmarket: '',
        wallfilter: '',
      },
    };
    this.searchService.createSearchJob(body)
      .then(data => {
        this.searchService.weapons.next(data);
      })
      .catch(error => {
        this.errorMessage = <any>error;
        this.activated = false;
      });
  }

  openInModal(id: number, weapon) {
    this.queryService.emitShowDialog(weapon);
  }

  /**
   * Subscribe of changes in search results (weapons)
   */
  subscribeItems() {
    this.searchService.weapons
      .takeUntil(this.ngUnsubscribe)
      .subscribe(
        data => {
          if (data === 'FINISHED') {
            this.activated = false;
          } else {
            this.weapons = data;
            this.searchBlock = this.weapons.length > 0;
          }
        },
        err => console.log(err),
        () => this.activated = false
      );
  }

}
