import { Component, OnInit, Input, Output, OnChanges, EventEmitter, Injectable } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { CreateCaseService } from '../../../../services/case/createCase.service';
import { AuthenticationService } from '../../../../services';

@Component({
  selector: 'dialog-create-case',
  templateUrl: 'dialog-create-case.component.html',
  styleUrls: ['dialog-create-case.scss'],
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

export class DialogCreateCaseComponent implements OnInit {
  @Input() closable = true;
  @Input() openModalCreate = false;

  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() successAdd: EventEmitter<any> = new EventEmitter<any>();

  public name: string;
  public type: string;

  constructor(
    private createCase: CreateCaseService,
    private auth: AuthenticationService,

  ) { }

  ngOnInit() {

  }

  /**
   * Close modal
   * @param item
   */
  close(item = false) {
    this.openModalCreate = false;
    this.visibleChange.emit(this.openModalCreate);
    if (item) {
      this.successAdd.emit(item);
    }
  }

  /**
   * Create case
   */
  save() {
    this.createCase.handler(this.name, this.auth.username, this.type)
      .then(res => this.close(res))
      .catch(err => {
        console.error(err);
      });
  }
}
