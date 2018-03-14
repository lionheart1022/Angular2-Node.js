import { Component, OnInit, Injectable, Output, EventEmitter, Input } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Location } from '@angular/common';

@Component({
  selector: 'confirm-modal',
  templateUrl: 'confirm.component.html',
  styleUrls: ['confirm.scss'],
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

export class ConfirmComponent implements OnInit {

  @Output() deleteEv: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input() openModalConfirm: boolean;
  @Input() eventButton: string;

  constructor(
    private location: Location
  ) { }

  ngOnInit() {

  }

  goBack(): void {
    this.location.back();
  }

  /**
   * Delete item
   */
  deleteItem() {
    this.deleteEv.emit(true);
    this.openModalConfirm = false;
  }

  /**
   * Close modal window
   */
  close() {
    this.openModalConfirm = false;
    this.deleteEv.emit(false);

  }

}
