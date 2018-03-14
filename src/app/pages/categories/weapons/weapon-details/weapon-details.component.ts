import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ModalService } from '../../../../services/modal.service';
import { Subject } from 'rxjs';
import { SearchService } from '../../../../services/search.service';
import { exist } from '../../../../helpers/exist_item/exist';
import { Weapon } from '../../../../interfaces/weapon';
import { AddToTheCaseService } from '../../../../services/case/addTotheCase.service';

@Component({
  selector: 'weapon-details',
  templateUrl: 'weapon-details.component.html',
  styleUrls: ['weapon-details.scss'],
})
export class WeaponDetailsComponent implements OnInit, OnDestroy {

  private ngUnsubscribe: Subject<boolean> = new Subject<boolean>();

  @Input() otherComponent: boolean = false;
  public weapons;
  public openModal: boolean;
  public openVendorDialog: boolean = false;
  public preview: boolean;
  public next: boolean;
  public itemKey: number;
  public category = 'weapons';
  weapon: Weapon;
  product_photo_big;

  constructor(
    private modalService: ModalService,
    private searchService: SearchService,
    private addTocaseService: AddToTheCaseService,
  ) { }

  ngOnInit(): void {
    this.subscribeToModalEvent();
    // if(exist(this.otherComponent)) {
    //   this.subscribeForOtherComponent();
    // }
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  // private subscribeForOtherComponent() {
  //   this.modalService.otherComponentItem$
  //     .takeUntil(this.ngUnsubscribe)
  //     .subscribe(data => {
  //       this.weapon = data;
  //       if (exist(data.product_photo_big)) {
  //         this.weapon.product_photo = data.product_photo_big;
  //       }
  //     });
  // }

  /**
   * Subscribe of changes in search results (weapons), current item_id (weaponId$) and modal status  (weaponDetailsModal$)
   */
  private subscribeToModalEvent(): void {

    console.log(this);
    this.searchService.weapons
      .takeUntil(this.ngUnsubscribe)
      .subscribe(data => {
        this.weapons = data;
      });

    this.modalService.weaponDetailsModal$
      .takeUntil(this.ngUnsubscribe)
      .subscribe(data => {
        this.openModal = data;
      });

    this.modalService.weaponId$
      .takeUntil(this.ngUnsubscribe)
      .subscribe(data => {
        this.itemKey = data;
        this.setItem();
      });

  }

  /**
   * CLose modal
   */
  closeModal() {
    this.openModal = false;
    this.modalService.weaponDetailsModal$.next(false);
  }

  /**
   * Choose another item from weapons array
   * @param direction
   */
  changeItem(direction: number) {

    if (direction === 1) {
      this.itemKey++;
      this.setItem();
    }
    if (direction === 0) {
      this.itemKey--;
      this.setItem();
    }
  }

  /**
   * Add target to the case
   * @param idCase
   */
  addToCase(idCase: string) {
    this.addTocaseService.handler(this.weapon.product_id.toString(), idCase, this.weapon.customrequestid)
      .then(res => console.log(res))
      .catch(err => console.error(err));
  }

  /**
   * Open modal window with information about vendor
   */
  openVendorDialogMethod() {
    this.openVendorDialog = true;
    this.modalService.vendor$.next(this.weapon.vendor_info);
  }

  /**
   * Close modal window with information about vendor
   */
  vendorModalClose() {
    this.openVendorDialog = false;
  }

  /**
   * Get data from new item
   */
  private setItem() {
    this.checkNeighborItem();
    const item = this.weapons.filter((item, index) => index === this.itemKey);
    if (exist(item[0])) {
      this.weapon = item[0];
      let regex = /\d+/g;
      this.weapon.product_price = this.weapons[this.itemKey].product_price;//.match(regex);
      if (exist(this.weapons[this.itemKey].product_photo_big)) {
        this.weapon.product_photo = this.weapons[this.itemKey].product_photo_big;

      }
    }
  }

  /**
   * Check of neighboring elements, and disable/enable arrows
   */
  private checkNeighborItem() {
    if (!exist(this.weapons[this.itemKey - 1])) {
      this.preview = false;
    } else {
      this.preview = true;
    }
    if (!exist(this.weapons[this.itemKey + 1])) {
      this.next = false;
    } else {
      this.next = true;
    }
  }
}
