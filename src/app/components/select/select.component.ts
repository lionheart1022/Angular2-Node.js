import { Option } from './../../interfaces/option.interface';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {
  @Input() placeholder: string = '';
  @Input() options: Option[] = [];
  @Output() selectOption: EventEmitter<Option> = new EventEmitter<Option>();
  show: boolean = false;
  currentOption: Option;

  constructor() {}

  ngOnInit() {
    this.currentOption = this.options[0];
  }

  toggle() {
    this.show = !this.show;
  }

  onSelectOption(option: Option) {
    this.toggle();
    this.currentOption = option;
    this.selectOption.emit(this.currentOption);
  }
}
