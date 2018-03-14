import { Component, OnInit, Input, Output, OnChanges, EventEmitter, Injectable } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { GetAllCasesService } from '../../../services/case/getAllCases.service';
import { exist } from '../../../helpers/exist_item/exist';
import * as jsPDF from 'jspdf';
import {TargetsService} from '../../../services/targets.service';
import {IVendorInfo} from '../../../interfaces/targets/vendor-info.interface';
import { ITarget } from '../../../interfaces';

@Component({
  selector: 'app-dialog',
  templateUrl: 'dialog-query.component.html',
  styleUrls: ['dialog-query.scss'],
  animations: [
    trigger('dialog', [
      transition('void => *', [
        style({ transform: 'scale3d(.3, .3, .3)' }),
        animate(100)
      ]),
      transition('* => void', [
        animate(100, style({ transform: 'scale3d(.0, .0, .0)' }))
      ])
    ])
  ]
})

@Injectable()

export class DialogComponent implements OnInit {
  @Input() closable = true;
  @Input() preview = true;
  @Input() next = true;
  @Input() openModal: boolean;
  @Input() openVendorDialog: boolean;
  @Input() category: HTMLElement;
  @Input() currentItem: any;
  @Input() addTocase: boolean;

  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() visibleChangeVendorDialog: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() itemChange: EventEmitter<number> = new EventEmitter<number>();
  @Output() idCase: EventEmitter<number> = new EventEmitter<number>();

  idItem: number;
  public allCases: any;
  public emptyCaseBox: boolean;
  public openCasesBox: boolean;
  public open_create_case_dialog = false;
  private info: IVendorInfo;
  constructor(
    private getAllCases: GetAllCasesService,
    private targetsService: TargetsService,
  ) {
    this.targetsService.target$.subscribe((target: ITarget) => {
      this.info = this.targetsService.getTargetData(target).vendor_info;
      console.log('++++++++++++++++++ DIALOG QUERY +++++++++++++++++++++++');
      console.log(this.info);
    });
  }

  ngOnInit() {
    this.downloadPDF();
    this.allCases = this.getAllCases.allCases;
    if (!exist(this.allCases) || this.allCases.length === 0) {
      this.getAllCases.handler()
        .then(data => {
          this.allCases = data;
        });
    }
  }

  close() {
    this.emptyCaseBox = false;
    this.openCasesBox = false;
    this.openModal = false;
    this.visibleChange.emit(this.openModal);
  }

  previewItem() {
    this.itemChange.emit(0);
  }
  nextItem() {
    this.itemChange.emit(1);
  }

  /**
   * Open select with all cases
   */
  openAllcases() {
    if (this.allCases.length === 0) {
      this.emptyCaseBox = true;
      this.openCasesBox = false;
    } else {
      this.emptyCaseBox = false;
      this.openCasesBox = !this.openCasesBox;
    }
  }

  /**
   * Add target to the case
   * @param id
   */
  selectCase(id: number): void {
    this.idItem = id;
    this.idCase.emit(this.idItem);
    this.emptyCaseBox = false;
    this.openCasesBox = false;
  }

  /**
   * Open modal window create case
   */
  open_module_create_case_dialog() {
    this.open_create_case_dialog = true;
    this.openModal = false;
  }

  /**
   * Detect changes of visibility modal window for create case
   */
  change_visibles_create_case_dialog() {
    this.open_create_case_dialog = false;
    this.openModal = true;
  }

  /**
   * Detect changes of visible modal window with detail information of vendor
   */
  vendorModalClose() {
    this.openVendorDialog = false;
    this.visibleChangeVendorDialog.emit(false);
  }

  /**
   * Add new case to the cases array
   * @param item
   */
  successAddCase(item) {
    this.allCases.push(item);
  }

  /**
   * Download pdf
   */
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
      pdf.text(32, p, `Product price:    ${this.currentItem.product_price.match(regex)}`);
      p += 15
      pdf.text(32, p, `Ships to ${this.currentItem.ships_to}`);
      p += 15
      pdf.text(32, p, `Ships from: ${this.currentItem.ships_from}`);
      p += 15
      pdf.text(32, p, `Escrow: ${this.currentItem.escrow}`);
      p += 15
      pdf.addImage(this.currentItem.product_photo, 'JPEG', 15, p, 180, 160);
      let img = new Image();
      img.onload = function () {
        let self = this as HTMLCanvasElement;
        let ctx = canvas.getContext('2d');
        ctx.drawImage(self, 0, 0);
        let imgData = canvas.toDataURL('image/png');
        pdf.addImage(imgData, 'PNG', 67, c - 4.6, 12, 6);
      };
      img.crossOrigin = "";
      img.src = '/images/bitcoin.png';

      pdf.addPage();
      // vendor details page
      let p1 = 25;
      pdf.text(90, p1, 'Vendor detail');
      p1 += 15;
      pdf.text(32, p1, `User name: ${this.currentItem.vendor_info.username}`);
      p1 += 15;
      pdf.text(32, p1, `FE enabled: ${this.currentItem.vendor_info.fe_enabled}`);
      p1 += 15;
      pdf.text(32, p1, `Join date: ${this.currentItem.vendor_info.join_date}`);
      p1 += 15;
      pdf.text(32, p1, `Last active: ${this.currentItem.vendor_info.last_active}`);
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
      pdf.text(tab1, p2, this.currentItem.vendor_info.ratings_summary[0]['1 Star Count']);
      tab1 += 23;
      pdf.text(tab1, p2, this.currentItem.vendor_info.ratings_summary[0]['2 Star Count']);
      tab1 += 23;
      pdf.text(tab1, p2, this.currentItem.vendor_info.ratings_summary[0]['3 Star Count']);
      tab1 += 23;
      pdf.text(tab1, p2, this.currentItem.vendor_info.ratings_summary[0]['4 Star Count']);
      tab1 += 13;
      pdf.text(tab1, p2, this.currentItem.vendor_info.ratings_summary[0]['5 Star Count']);
      tab1 += 23;
      pdf.text(tab1, p2, this.currentItem.vendor_info.ratings_summary[0]['rating']);
      p2 += 15;
      tab1 = 12;
      pdf.text(tab1, p2, 'Newer than 3 Month ');
      tab1 += 66;
      pdf.text(tab1, p2, this.currentItem.vendor_info.ratings_summary[1]['1 Star Count']);
      tab1 += 23;
      pdf.text(tab1, p2, this.currentItem.vendor_info.ratings_summary[1]['2 Star Count']);
      tab1 += 23;
      pdf.text(tab1, p2, this.currentItem.vendor_info.ratings_summary[1]['3 Star Count']);
      tab1 += 23;
      pdf.text(tab1, p2, this.currentItem.vendor_info.ratings_summary[1]['4 Star Count']);
      tab1 += 13;
      pdf.text(tab1, p2, this.currentItem.vendor_info.ratings_summary[1]['5 Star Count']);
      tab1 += 23;
      pdf.text(tab1, p2, this.currentItem.vendor_info.ratings_summary[1]['rating']);
      p2 += 15;
      tab1 = 12;
      pdf.text(36, p2, 'Older ');
      tab1 += 66;
      pdf.text(tab1, p2, this.currentItem.vendor_info.ratings_summary[2]['1 Star Count']);
      tab1 += 23;
      pdf.text(tab1, p2, this.currentItem.vendor_info.ratings_summary[2]['2 Star Count']);
      tab1 += 23;
      pdf.text(tab1, p2, this.currentItem.vendor_info.ratings_summary[2]['3 Star Count']);
      tab1 += 23;
      pdf.text(tab1, p2, this.currentItem.vendor_info.ratings_summary[2]['4 Star Count']);
      tab1 += 13;
      pdf.text(tab1, p2, this.currentItem.vendor_info.ratings_summary[2]['5 Star Count']);
      tab1 += 23;
      pdf.text(tab1, p2, this.currentItem.vendor_info.ratings_summary[2]['rating']);


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

  /**
   * Increment and check text height
   * @param p
   * @param step
   * @param pdf
   * @return {number}
   */
  private incrementP(p: number, step: number, pdf: any) {
    const pageHeight = pdf.internal.pageSize.height;
    if (p + step > pageHeight) {
      pdf.addPage();
      p = 25;
      return p
    }
    return p + step;
  }

  /**
   * Get chunks of text
   * @param text
   * @param lengthChunk
   * @param p
   * @param tab
   * @param pdf
   * @return {number}
   */
  private chunkText(text: string, lengthChunk: number, p: number, tab: number, pdf: any) {
    const lines = text.split(/\r?\n/);
    for (let line of lines) {
      let length = line.length;
      if (length > lengthChunk) {
        for (let i = 0; i < length; i += lengthChunk) {
          let key = lengthChunk;
          if (exist(line[i + key])) {
            while (line[i + key].charCodeAt(0) !== 32) {
              key--;
              console.log(line[i + key], '****');
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
}
