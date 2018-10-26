import { Injectable } from '@angular/core';

import { config } from '../config';
import {IExport} from "../../interfaces/Export/export.interface";
import * as jsPDF from "jspdf";
import {exist} from "../../helpers/exist_item/exist";


@Injectable()

export class ExportService {

  currentItem;

  constructor(
  ) {}


  exportToPDF(service: IExport) {
    let targetData = service.getItemForExport().getValue()['targetData'];
    this.currentItem = targetData[Object.keys(targetData)[0]];
    let name;
    name = 'target' + '_' + this.currentItem.type + '.pdf';
    name = name as HTMLElement;
    const pdf = new jsPDF();
    const pageHeight = pdf.internal.pageSize.height;
    let regex = /\d+/g;
    let p = 25;
    let canvas = document.createElement('canvas');
    if (this.currentItem.product_name.length > 35) {
      const length = this.currentItem.product_name.length;

      pdf.text(32, p, 'Target name:');
      p = this.chunkText(this.currentItem.product_name, 50, p, 40, pdf);

      // for (let i = 0; i <= length; i += 35, p += 15) {
      //   if (i + 35 < length) {
      //     pdf.text(70, p, this.currentItem.product_name.slice(i, i + 35));
      //   } else {
      //     let q = length - i;
      //     pdf.text(70, p, this.currentItem.product_name.slice(i, i + q));
      //   }
      // }
    } else {
      pdf.text(32, p, `Target name: ${this.currentItem.product_name}`);
    }
    p = this.incrementP(p,15,pdf);
    pdf.text(32, p, `Vendor: ${this.currentItem.vendor}`);
    p = this.incrementP(p,15,pdf);
    const c = p;
    pdf.text(
      32,
      p,
      `Product price:    ${this.currentItem.product_price.match(regex)}`
    );
    p = this.incrementP(p,15,pdf);
    pdf.text(32, p, `Ships to ${this.currentItem.ships_to}`);
    p = this.incrementP(p,15,pdf);
    pdf.text(32, p, `Ships from: ${this.currentItem.ships_from}`);
    p = this.incrementP(p,15,pdf);
    pdf.text(32, p, `Escrow: ${this.currentItem.escrow}`);
    p = this.incrementP(p,15,pdf);
    let tabImage = 32;
    pdf.addImage(this.currentItem.product_photo_big, 'JPEG', tabImage, p);
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
    p1 = this.incrementP(p1,15,pdf);
    pdf.text(32, p1, `User name: ${this.currentItem.vendor_info.username}`);
    p1 = this.incrementP(p1,15,pdf);
    pdf.text(
      32,
      p1,
      `FE enabled: ${this.currentItem.vendor_info.fe_enabled}`
    );
    p1 = this.incrementP(p1,15,pdf);
    pdf.text(32, p1, `Join date: ${this.currentItem.vendor_info.join_date}`);
    p1 = this.incrementP(p1,15,pdf);
    pdf.text(
      32,
      p1,
      `Last active: ${this.currentItem.vendor_info.last_active}`
    );
    p1 = this.incrementP(p1,15,pdf);
    pdf.text(32, p1, 'Terms and conditions: ');
    p1 = this.incrementP(p1,7,pdf);

    let terms = this.currentItem.vendor_info.terms_and_conditions;

    if (terms.length > 50) {
      p1 = this.chunkText(terms, 45, p1, 40, pdf);
    } else {
      pdf.text(32, p1, terms);
    }

    p1 = this.incrementP(p1,15,pdf);
    pdf.text(32, p1, 'Public RGP key : ');
    p1 = this.incrementP(p1,7,pdf);

    let rgp = this.currentItem.vendor_info.pgp_key;

    if (rgp.length > 50) {
      p1 = this.chunkText(rgp, 34, p1, 40, pdf);
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
      tab += 20;
      if (item['product_name'].length > 30) {
        pdf.text(tab, p3, 'Target name:');
        p3 = this.incrementP(p3, 7, pdf);
        p3 = this.chunkText(item['product_name'], 50, p3, tab, pdf);
      } else {
        pdf.text(tab, p3, `Target name: ${item['product_name']}`);
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

  private incrementP(p: number, step: number, pdf: any) {
    const pageHeight = pdf.internal.pageSize.height;
    if (p + step > pageHeight - 25) {
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
}
