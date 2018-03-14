import { NotificationsService } from 'angular2-notifications';
import { AddToTheCaseService } from './../../../services/case/addTotheCase.service';
import { CreateCaseService } from './../../../services/case/createCase.service';
import { GetAllCasesService } from './../../../services/case/getAllCases.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { QueryService } from '../../../services/query.service';
import { exist } from '../../../helpers/exist_item/exist';
import * as jsPDF from 'jspdf';
import { Option } from '../../../interfaces/option.interface';

@Component({
  selector: 'app-query-dialog',
  templateUrl: './query-dialog.component.html',
  styleUrls: ['./query-dialog.component.scss']
})
export class QueryDialogComponent implements OnInit {
  data: any;
  @ViewChild('linkToOpenModal') linkToOpenModal: ElementRef;

  exists = false;
  id = -1;
  name = '';
  photo = '';
  photoBig = '';
  price = '';
  currency = '';
  description = '';
  vendor = '';
  shipsFrom = '';
  shipsTo = '';
  escrow = '';
  termsAndConditions = '';
  topRating = 0;
  setRating = 0;
  listingsFormUsername = [];
  ratings: any = {};
  pgpKey = '';
  feEnabled = '';
  username = '';
  joinDate = '';
  lastActive = '';
  showSelectCase = false;
  showCreateNew = false;
  allCases: any;
  currentItem: any;
  category: HTMLElement;
  caseName: string = '';
  newCaseName: string = '';
  caseType: string;
  caseId: string | number;

  constructor(
    private queryService: QueryService,
    private getAllCases: GetAllCasesService,
    private createCase: CreateCaseService,
    private addToTheCaseService: AddToTheCaseService,
    private notificationService: NotificationsService
  ) {
    this.queryService.onShowDialog().subscribe((data: any) => {
      this.onShowDialog(data);
    });
  }

  ngOnInit() {
    this.allCases = this.getAllCases.allCases;
    if (!exist(this.allCases) || this.allCases.length === 0) {
      this.getAllCases.handler().then(data => {
        this.allCases = data;
      });
    }
  }

  downloadPDF() {
    if (exist(this.currentItem)) {
      // const testItem = {
      //   product_id: '1356548',
      //   product_name: 'product name product name product name',
      //   vendor: 'vendor',
      //   product_price: 'product_price product_price product_price product_price',
      //   ships_to: 'ships_to ships_to ships_to',
      //   ships_from: 'ships_from ships_from ships_from',
      //   escrow: 'escrow',
      // }
      let name;
      name = this.category + '_' + this.currentItem.product_id + '.pdf';
      name = name as HTMLElement;
      const pdf = new jsPDF();
      const pageHeight = pdf.internal.pageSize.height;
      let regex = /\d+/g;
      let p = 25;
      let canvas = document.createElement('canvas');
      if (this.currentItem.product_name.length > 35) {
        const length = this.currentItem.product_name.length;
        pdf.text(32, p, 'Product name:');
        for (let i = 0; i <= length; i += 35, p += 15) {
          if (i + 35 < length) {
            pdf.text(70, p, this.currentItem.product_name.slice(i, i + 35));
          } else {
            let q = length - i;
            pdf.text(70, p, this.currentItem.product_name.slice(i, i + q));
          }
        }
      } else {
        pdf.text(32, p, `Product name: ${this.currentItem.product_name}`);
      }

      pdf.text(32, p, `Vendor: ${this.currentItem.vendor}`);
      p += 15;
      const c = p;
      pdf.text(
        32,
        p,
        `Product price:    ${this.currentItem.product_price.match(regex)}`
      );
      p += 15;
      pdf.text(32, p, `Ships to ${this.currentItem.ships_to}`);
      p += 15;
      pdf.text(32, p, `Ships from: ${this.currentItem.ships_from}`);
      p += 15;
      pdf.text(32, p, `Escrow: ${this.currentItem.escrow}`);
      p += 15;
      pdf.addImage(this.currentItem.product_photo, 'JPEG', 15, p, 180, 160);
      let img = new Image();
      img.onload = function() {
        let self = this as HTMLCanvasElement;
        let ctx = canvas.getContext('2d');
        ctx.drawImage(self, 0, 0);
        let imgData = canvas.toDataURL('image/png');
        pdf.addImage(imgData, 'PNG', 67, c - 4.6, 12, 6);
      };
      img.crossOrigin = '';
      img.src = '/images/bitcoin.png';

      pdf.addPage();
      // vendor details page
      let p1 = 25;
      pdf.text(90, p1, 'Vendor detail');
      p1 += 15;
      pdf.text(32, p1, `User name: ${this.currentItem.vendor_info.username}`);
      p1 += 15;
      pdf.text(
        32,
        p1,
        `FE enabled: ${this.currentItem.vendor_info.fe_enabled}`
      );
      p1 += 15;
      pdf.text(32, p1, `Join date: ${this.currentItem.vendor_info.join_date}`);
      p1 += 15;
      pdf.text(
        32,
        p1,
        `Last active: ${this.currentItem.vendor_info.last_active}`
      );
      p1 += 15;
      pdf.text(32, p1, 'Terms and conditions: ');
      p1 += 7;

      let terms = this.currentItem.vendor_info.terms_and_conditions;

      if (terms.length > 50) {
        p1 = this.chunkText(terms, 42, p1, 40, pdf);
      } else {
        pdf.text(32, p1, terms);
      }

      p1 += 15;
      pdf.text(32, p1, 'Public RGP key : ');
      p1 += 7;

      let rgp = this.currentItem.vendor_info.pgp_key;

      if (rgp.length > 50) {
        p1 = this.chunkText(rgp, 42, p1, 40, pdf);
      } else {
        pdf.text(32, p1, rgp);
      }

      pdf.addPage();
      // vendor ratings page
      let p2 = 25;
      pdf.text(95, p2, 'Ratings');
      p2 += 15;
      let tab = 35;
      let tab1 = 12;
      pdf.text(tab, p2, 'Age');
      tab += 33;
      pdf.text(tab, p2, '1 stars');
      tab += 23;
      pdf.text(tab, p2, '2 stars');
      tab += 23;
      pdf.text(tab, p2, '3 stars');
      tab += 23;
      pdf.text(tab, p2, '4 stars');
      tab += 23;
      pdf.text(tab, p2, '5 stars');
      tab += 23;
      pdf.text(tab, p2, 'Rating');
      p2 += 15;
      pdf.text(tab1, p2, 'Newer than 1 Month ');
      tab1 += 66;
      if (this.currentItem.vendor_info.ratings_summary.length) {
        pdf.text(
          tab1,
          p2,
          this.currentItem.vendor_info.ratings_summary[0]['1 Star Count']
        );
        tab1 += 23;
        pdf.text(
          tab1,
          p2,
          this.currentItem.vendor_info.ratings_summary[0]['2 Star Count']
        );
        tab1 += 23;
        pdf.text(
          tab1,
          p2,
          this.currentItem.vendor_info.ratings_summary[0]['3 Star Count']
        );
        tab1 += 23;
        pdf.text(
          tab1,
          p2,
          this.currentItem.vendor_info.ratings_summary[0]['4 Star Count']
        );
        tab1 += 13;
        pdf.text(
          tab1,
          p2,
          this.currentItem.vendor_info.ratings_summary[0]['5 Star Count']
        );
        tab1 += 23;
        pdf.text(
          tab1,
          p2,
          this.currentItem.vendor_info.ratings_summary[0]['rating']
        );
        p2 += 15;
        tab1 = 12;
        pdf.text(tab1, p2, 'Newer than 3 Month ');
        tab1 += 66;
        pdf.text(
          tab1,
          p2,
          this.currentItem.vendor_info.ratings_summary[1]['1 Star Count']
        );
        tab1 += 23;
        pdf.text(
          tab1,
          p2,
          this.currentItem.vendor_info.ratings_summary[1]['2 Star Count']
        );
        tab1 += 23;
        pdf.text(
          tab1,
          p2,
          this.currentItem.vendor_info.ratings_summary[1]['3 Star Count']
        );
        tab1 += 23;
        pdf.text(
          tab1,
          p2,
          this.currentItem.vendor_info.ratings_summary[1]['4 Star Count']
        );
        tab1 += 13;
        pdf.text(
          tab1,
          p2,
          this.currentItem.vendor_info.ratings_summary[1]['5 Star Count']
        );
        tab1 += 23;
        pdf.text(
          tab1,
          p2,
          this.currentItem.vendor_info.ratings_summary[1]['rating']
        );
        p2 += 15;
        tab1 = 12;
        pdf.text(36, p2, 'Older ');
        tab1 += 66;
        pdf.text(
          tab1,
          p2,
          this.currentItem.vendor_info.ratings_summary[2]['1 Star Count']
        );
        tab1 += 23;
        pdf.text(
          tab1,
          p2,
          this.currentItem.vendor_info.ratings_summary[2]['2 Star Count']
        );
        tab1 += 23;
        pdf.text(
          tab1,
          p2,
          this.currentItem.vendor_info.ratings_summary[2]['3 Star Count']
        );
        tab1 += 23;
        pdf.text(
          tab1,
          p2,
          this.currentItem.vendor_info.ratings_summary[2]['4 Star Count']
        );
        tab1 += 13;
        pdf.text(
          tab1,
          p2,
          this.currentItem.vendor_info.ratings_summary[2]['5 Star Count']
        );
        tab1 += 23;
        pdf.text(
          tab1,
          p2,
          this.currentItem.vendor_info.ratings_summary[2]['rating']
        );
      }

      // vendor listings page
      pdf.addPage();

      let p3 = 25;
      pdf.text(95, p3, 'Listings');
      p3 += 15;
      tab = 12;

      for (let item of this.currentItem.vendor_info.listings) {
        // add image
        tab += 60;
        if (item['product_name'].length > 30) {
          pdf.text(tab, p3, 'Product name:');
          p3 = this.incrementP(p3, 7, pdf);
          p3 = this.chunkText(item['product_name'], 40, p3, tab, pdf);
        } else {
          pdf.text(tab, p3, `Product name: ${item['product_name']}`);
        }
        p3 = this.incrementP(p3, 7, pdf);
        pdf.text(tab, p3, `Escrow: ${item['escrow']}`);
        p3 = this.incrementP(p3, 7, pdf);
        pdf.text(tab, p3, 'Order: order');
        p3 = this.incrementP(p3, 7, pdf);
        pdf.text(tab, p3, 'Price: 0.0001653');

        tab = 12;
        p3 = this.incrementP(p3, 17, pdf);
      }

      pdf.save(name);
    }
  }

  private async onShowDialog(data) {
    this.currentItem = data;
    await this.setData(data);
    await this.showDialog();
  }

  private async setData(data) {
    this.data = data;
    if (!data) {
      this.exists = false;
      return;
    }
    this.exists = true;
    this.id = data.product_id;
    this.name = data.product_name;
    this.photo = data.product_photo;
    this.photoBig = data.product_photo_big;
    if (data.product_price == null) {
      data.product_price = '0 / 0';
    }
    if (!/\s*[0-9\.\,]+\s*(\$|USD)*\s*/g.test(data.product_price)) {
      data.product_price = '0 $';
    }
    const [price, currency] = data.product_price.split(' ');
    this.price = price;
    this.currency = currency === 'USD' ? '$' : '$';
    this.description = data.product_description || '(no set)';
    this.vendor = data.vendor;
    this.shipsFrom = data.ships_from || '(no set)';
    this.shipsTo = data.ships_to || '(no set)';
    this.escrow = !!data.escrow ? 'Yes' : 'No';
    this.termsAndConditions = data.terms_and_conditions || '(no set)';
    const vendorInfo = data.vendor_info;
    this.feEnabled = !!vendorInfo.fe_enabled ? 'Yes' : 'No';
    this.username = vendorInfo.username;
    this.joinDate = vendorInfo.join_date;
    this.lastActive = vendorInfo.last_active;
    const ratings = data.product_ratings;
    this.topRating = 0;
    this.setRating = 0;
    ratings.forEach(item => {
      if (item.rating == null) {
        item.rating = '0 / 0';
      }
      if (!/\s*[0-9\.\,]+\s*\/\s*[0-9\.\,]+\s*/g.test(item.rating)) {
        item.rating = '0 / 0';
      }
      const parseRating = item.rating.split('/');
      this.topRating += +parseRating[0].trim();
      this.setRating += +parseRating[1].trim();
    });
    const ratLength = ratings.length > 0 ? ratings.length : 1;
    this.topRating /= ratLength;
    this.setRating /= ratLength;
    this.pgpKey = data.pgp_key || '(no set)';
    const listingsFormUsername = vendorInfo.listings.length
      ? vendorInfo.listings
      : [];
    this.listingsFormUsername = [];
    listingsFormUsername.forEach(item => {
      const listing = {
        name: '',
        rating: '',
        category: '',
        photo: '',
        price: 0,
        currency: ''
      };
      listing.name = item.product_name;
      listing.rating = item.product_overall_ratings;
      listing.category = item.product_category;
      listing.photo = item.product_photo;
      if (item.rating == null || item.rating.length === 0) {
        item.product_price = { price };
      }
      if (item.rating == null) {
        item.product_price = '0 / 0';
      }
      if (!/\s*[0-9\.\,]+\s*\/\s*[0-9\.\,]+\s*/g.test(item.rating)) {
        item.product_price = '0 / 0';
      }
      if (
        item &&
        item[0] &&
        item[0].price &&
        item.product_price[0].price.split('\n').length >= 2
      ) {
        listing.price = item.product_price[0].price.split('\n')[0];
      } else {
        listing.price = ['0', '$'];
      }
      const [price, currency] = listing.price;
      listing.price = price;
      listing.currency = currency === '$' ? '$' : '$';

      this.listingsFormUsername.push(listing);
    });
    this.ratings = {
      newerThan1Month: {
        age: 'Newer than 1 Month',
        star1: 0,
        star2: 0,
        star3: 0,
        star4: 0,
        star5: 0,
        rating: 0,
        top: 0,
        count: 0
      },
      newerThan3Months: {
        age: 'Newer than 3 Months',
        star1: 0,
        star2: 0,
        star3: 0,
        star4: 0,
        star5: 0,
        rating: 0,
        top: 0,
        count: 0
      },
      older: {
        age: 'Older',
        star1: 0,
        star2: 0,
        star3: 0,
        star4: 0,
        star5: 0,
        rating: 0,
        top: 0,
        count: 0
      }
    };
    ratings.forEach(item => {
      if (item.rating == null) {
        item.rating = '0 / 0';
      }
      if (!/\s*[0-9\.\,]+\s*\/\s*[0-9\.\,]+\s*/g.test(item.rating)) {
        item.rating = '0 / 0';
      }
      let [top, set] = item.rating.split('/');
      top = +top.trim();
      set = +set.trim();
      const timestamp = item.rating_timestamp;
      if (['1 month ago'].indexOf(timestamp) >= 0) {
        this.ratings.newerThan1Month.rating += +set;
        this.ratings.newerThan1Month.top += +top;
        this.ratings.newerThan1Month.count++;
        if (set >= 0.01 && set <= 0.99) {
          this.ratings.newerThan1Month.star1++;
        }
        if (set >= 1 && set <= 1.99) {
          this.ratings.newerThan1Month.star2++;
        }
        if (set >= 2 && set <= 2.99) {
          this.ratings.newerThan1Month.star3++;
        }
        if (set >= 3 && set <= 3.99) {
          this.ratings.newerThan1Month.star4++;
        }
        if (set >= 4 && set <= 5) {
          this.ratings.newerThan1Month.star5++;
        }
      } else if (['2 months ago', '3 months ago'].indexOf(timestamp) >= 0) {
        this.ratings.newerThan3Months.rating += +set;
        this.ratings.newerThan3Months.top += +top;
        this.ratings.newerThan3Months.count++;
        if (set >= 0.01 && set <= 0.99) {
          this.ratings.newerThan3Months.star1++;
        }
        if (set >= 1 && set <= 1.99) {
          this.ratings.newerThan3Months.star2++;
        }
        if (set >= 2 && set <= 2.99) {
          this.ratings.newerThan3Months.star3++;
        }
        if (set >= 3 && set <= 3.99) {
          this.ratings.newerThan3Months.star4++;
        }
        if (set >= 4) {
          this.ratings.newerThan3Months.star5++;
        }
      } else {
        this.ratings.older.rating += +set;
        this.ratings.older.top += +top;
        this.ratings.older.count++;
        if (set >= 0.01 && set <= 0.99) {
          this.ratings.older.star1++;
        }
        if (set >= 1 && set <= 1.99) {
          this.ratings.older.star2++;
        }
        if (set >= 2 && set <= 2.99) {
          this.ratings.older.star3++;
        }
        if (set >= 3 && set <= 3.99) {
          this.ratings.older.star4++;
        }
        if (set >= 4) {
          this.ratings.older.star5++;
        }
      }
    });
    if (!this.ratings.newerThan1Month.count) {
      this.ratings.newerThan1Month.count = 1;
    }
    if (!this.ratings.newerThan3Months.count) {
      this.ratings.newerThan3Months.count = 1;
    }
    if (!this.ratings.older.count) {
      this.ratings.older.count = 1;
    }

    this.ratings.newerThan1Month.top /= this.ratings.newerThan1Month.count;
    this.ratings.newerThan1Month.rating /= this.ratings.newerThan1Month.count;
    this.ratings.newerThan3Months.top /= this.ratings.newerThan3Months.count;
    this.ratings.newerThan3Months.rating /= this.ratings.newerThan3Months.count;
    this.ratings.older.top /= this.ratings.newerThan1Month.count;
    this.ratings.older.rating /= this.ratings.newerThan1Month.count;
  }

  private incrementP(p: number, step: number, pdf: any) {
    const pageHeight = pdf.internal.pageSize.height;
    if (p + step > pageHeight) {
      pdf.addPage();
      p = 25;
      return p;
    }
    return p + step;
  }

  private chunkText(
    text: string,
    lengthChunk: number,
    p: number,
    tab: number,
    pdf: any
  ) {
    const lines = text.split(/\r?\n/);
    for (let line of lines) {
      let length = line.length;
      if (length > lengthChunk) {
        for (let i = 0; i < length; i += lengthChunk) {
          let key = lengthChunk;
          if (exist(line[i + key])) {
            while (line[i + key].charCodeAt(0) !== 32) {
              key--;
              if (!exist(line[i + key])) {
                key = lengthChunk;
                break;
              }
            }
          }
          p = this.incrementP(p, 7, pdf);
          if (i + key < length) {
            pdf.text(tab, p, line.slice(i, i + key));
          } else {
            let q = length - i;
            pdf.text(tab, p, line.slice(i, i + q));
          }
        }
      } else {
        p = this.incrementP(p, 7, pdf);
        pdf.text(tab, p, line);
      }
    }
    return p;
  }

  onSelectCase(option: Option) {
    this.caseName = option.name;
    this.caseId = option.id;
  }

  onSelectCaseType(option: Option) {
    console.log('onSelectCaseType', option);
  }

  save() {
    if (this.showCreateNew) {
      this.saveCase(this.newCaseName)
        .then(res => {
          this.notificationService.success(
            'Success',
            `The case "${this.caseName}" has been created`
          );
          this.caseId = res.id;
          return this.addToTheCase();
        })
        .catch(err => this.notificationService.success('Error', err.error));
    } else {
      this.addToTheCase();
    }
  }

  addToTheCase() {
    this.addToTheCaseService
      .handler(
        this.id.toString(),
        this.caseId.toString(),
        this.currentItem.customrequestid
      )
      .then(res => {
        this.notificationService.success('Success', `item has been added`);
        return res;
      });
  }

  saveCase(caseName: string): Promise<any> {
    if (!caseName)
      return Promise.reject(new Error('Please enter a new case name.'));
    return this.createCase.handler(caseName, this.caseType);
  }

  async showDialog() {
    (this.linkToOpenModal.nativeElement as HTMLElement).click();
  }

  toggleCreateNew() {
    this.showCreateNew = !this.showCreateNew;
  }

  toggleShowSelectCase() {
    this.showSelectCase = !this.showSelectCase;
  }
}
