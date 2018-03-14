import { Component, OnInit, Input, Output, OnChanges, EventEmitter, Injectable } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ModalService } from '../../../services/modal.service';
import { Subject } from 'rxjs';
import { exist } from '../../../helpers/exist_item/exist';

@Component({
  selector: 'dialog-vendor',
  templateUrl: 'dialog-vendor.component.html',
  styleUrls: ['dialog-vendor.scss'],
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
export class DialogVendorComponent implements OnInit {

  @Input() closable = true;
  @Input() openModal: boolean;

  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  private ngUnsubscribe: Subject<boolean> = new Subject<boolean>();

  public currentVendor: any;
  public averageRating: number;

  public preview: boolean = true;
  public next: boolean = true;

  public majorItem: number;

  public carouselItem0: any;
  public carouselItem1: any;
  public carouselItem2: any;
  public carouselItem3: any;

  public pageRatings: number = 0;
  public itemsRatingsTable: any;

  constructor(
    private modalService: ModalService
  ) { }

  ngOnInit() {
    this.subscribeVendor();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
    this.visibleChange.emit(false);
  }

  close() {
    this.openModal = false;
    this.visibleChange.emit(this.openModal);
    this.majorItem = 0;
  }

  subscribeVendor() {
    this.modalService.vendor$
      .takeUntil(this.ngUnsubscribe)
      .subscribe(data => {
        this.currentVendor = data;
        this.averageRating = (parseFloat(this.currentVendor.ratings_summary[0].rating) +
          parseFloat(this.currentVendor.ratings_summary[1].rating) +
          parseFloat(this.currentVendor.ratings_summary[2].rating)) / 3;
        this.majorItem = 0;
        this.setCarouselItems();
        this.checkNeighborItem();
        this.createRatingTable();
      });
  }


  nextCarouselItem() {
    if (exist(this.currentVendor.listings[this.majorItem + 1])) {
      this.majorItem = this.majorItem + 1;
      $('.listingsCarousel').animate({ 'left': '-572px' }, 500, () => {
        this.setCarouselItems();
        this.checkNeighborItem();
        $('.listingsCarousel').animate({ 'left': '-286px' }, 0);
      });
    }
  }
  previewCarouselItem() {
    if (exist(this.currentVendor.listings[this.majorItem - 1])) {
      this.majorItem = this.majorItem - 1;
      $('.listingsCarousel').animate({ 'left': '0px' }, 500, () => {
        this.setCarouselItems();
        this.checkNeighborItem();
        $('.listingsCarousel').animate({ 'left': '-286px' }, 0);
      });
    }
  }

  getArray(number) {
    return new Array(number);
  }
  nextRatingsTable() {
    if (exist(this.currentVendor.ratings[this.pageRatings + 5])) {
      let nextPage = this.pageRatings + 5;
      this.itemsRatingsTable = this.currentVendor.ratings.slice(this.pageRatings, nextPage);
      this.pageRatings = nextPage;
    }
  }
  previewRatingsTable() {
    if (exist(this.currentVendor.ratings[this.pageRatings - 5])) {
      let nextPage = this.pageRatings - 5;
      this.itemsRatingsTable = this.currentVendor.ratings.slice(nextPage, this.pageRatings);
      this.pageRatings = nextPage;
    }
  }

  clearText(text: string) {
    return text.replace(/[\n\r\t]/g, '');
  }
  private createRatingTable() {
    if (exist(this.currentVendor.ratings[this.pageRatings + 5])) {
      let nextPage = this.pageRatings + 5;

      this.itemsRatingsTable = this.currentVendor.ratings.slice(this.pageRatings, nextPage);
      this.pageRatings = nextPage;
    }
  }

  private setCarouselItems() {
    if (exist(this.currentVendor.listings[this.majorItem - 1])) {
      this.carouselItem0 = this.currentVendor.listings[this.majorItem - 1];
    }
    if (exist(this.currentVendor.listings[this.majorItem])) {
      this.carouselItem1 = this.currentVendor.listings[this.majorItem];
    }
    if (exist(this.currentVendor.listings[this.majorItem + 1])) {
      this.carouselItem2 = this.currentVendor.listings[this.majorItem + 1];
    }
    if (exist(this.currentVendor.listings[this.majorItem + 2])) {
      this.carouselItem3 = this.currentVendor.listings[this.majorItem + 2];
    }
  }

  private checkNeighborItem() {
    if (!exist(this.currentVendor.listings[this.majorItem - 1])) {
      this.preview = false;
    } else {
      this.preview = true;
    }
    if (!exist(this.currentVendor.listings[this.majorItem + 1])) {
      this.next = false;
    } else {
      this.next = true;
    }
  }

}
