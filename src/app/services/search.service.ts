import {Injectable, OnInit} from '@angular/core';
import { Subject } from 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';
import { HttpClient } from '@angular/common/http';

import { config } from './config';
import { Weapon } from '../interfaces';
import {SelectedSubcategoriesService} from "./subcategory/selectedSubCategory.service";

@Injectable()
export class SearchService{
  private jobIds: string[];
  private requestId: string;
  private filters: any = {
    dmfilter:'shippingTo=&shipsFrom=&escrow=&category=&applyFilter=&currencyFilter=EUR&priceFrom=&priceTo=&sortBy=1&vendorSelect=',
    wallfilter: 'city-id=&category=&shipping-to=&shipping-from=',
    tchkmarket: 'form[catT]‌=&form[catM]‌=&form[catB]‌=&form[sort]‌=pop_week_desc&form[limit]‌=90&form[rating]‌=0.0&form[vendorLevel]‌=1&form[shipsfrom]‌=0&form[shipsto]‌=0&form[vendoractivity]‌=0&form[quantity]‌=0&form[maxpricepunit]=0'
  };

  weapons: Subject<Weapon[] | string> = new Subject<Weapon[]>();

  constructor(
    private http: HttpClient,
    private selectedSubcatService: SelectedSubcategoriesService,
  ) {}

  createSearchJob(body: any): Promise<any> {
    let selectedItem = this.selectedSubcatService.selectedSubcategories$.getValue();
    body = this.setFilterValue(selectedItem, body);
    return this.http.post(`${config.url}crawler-robots/createSearchJob`, body)
      .toPromise()
      .then((res: string[]) => {
        this.jobIds = res;
        this.requestId = body.requestId;
        return this.checkJobStatus();
      });
  }

  getJobStatus(): Promise<any> {
    const body = this.jobIds;
    return this.http.post(`${config.url}crawler-robots/getJobStatus`, body).toPromise();
  }

  getSearchResults(): Promise<any> {
    const body = [this.requestId];
    return this.http.post(`${config.url}lookuprequests/lookupdata`, body).toPromise();
  }

  checkJobStatus(): Promise<any> {
    let status = {};
    let finishedIds = [];
    let len = 0;

    // test data
    // return Promise.resolve(this.getSearchResultTestData());

    return new Promise((resolve, reject) => {
      const checkTime = () => {
        try {
          setTimeout(async () => {
            status = await this.getJobStatus();

            const isFinish = (s: string) => s === 'FINISHED';
            const isFinishedAll = () => (<any>Object).values(status).every(isFinish);
            const getFinishedIds = (items) =>
              Object.keys(items).filter((item) => items[item] === 'FINISHED');

            finishedIds = getFinishedIds(status);

            if (finishedIds.length && finishedIds.length > len) {
              len = finishedIds.length;
              const result = await this.getSearchResults();
              const mergedResult = [].concat.apply([], result);
              this.weapons.next(mergedResult);

              if (isFinishedAll()) {
                this.weapons.next('FINISHED');
                return resolve(mergedResult);
              }
              checkTime();
            } else {
              checkTime();
            }
          }, 5 * 1000);
        } catch (err) {
          reject(err);
        }
      };

      checkTime();
    });
  }

  private setFilterValue(values, body) {
    Object.keys(this.filters).map((filter) => {
      let filterArray = this.filters[filter].split('&');
      filterArray = filterArray.map((item) => {
        if(item === 'category=') {
          item = this.saveItemInFilter(item, values[filter]);

        }
        if(item === 'form[catT]‌=') {
          item = this.saveItemInFilter(item, values[filter]);
        }
        return item;
      });
      body.filters[filter] = filterArray.join('&');
    });
    return body;
  }

  private saveItemInFilter(filter, value) {
    if(typeof value !== 'undefined') {
      filter += value;
    }
    return filter;
  }

  private getSearchResultTestData() {
  }

}