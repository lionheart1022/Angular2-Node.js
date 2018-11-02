import { Component, OnInit, Input, Output, OnChanges, EventEmitter, Injectable } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { CreateCaseService } from '../../../../services/case/createCase.service';
import { AuthenticationService } from '../../../../services';
import {FormControl, Validators} from '@angular/forms';

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

  name = new FormControl('', [Validators.required]);
  getNameErrorMessage() {
    return this.name.hasError('required') ? 'You must enter a value' :
        this.name.hasError('name') ? 'Not a valid name' :
        '';
  }

  type = new FormControl('', [Validators.required]);
  getTypeErrorMessage() {
    return this.type.hasError('required') ? 'You must select a type' :
        this.type.hasError('type') ? 'Not a valid type' :
        '';
  }

  addeduser: boolean;

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
    var current_username = this.auth.username;
    if (!this.addeduser) {
      current_username = '';
    }

    if (this.name && this.type) {
      this.createCase.handler(this.name.value, current_username, this.type.value)
      .then(res => this.close(res))
      .catch(err => {
        console.error(err);
      });
    }
  }
}
