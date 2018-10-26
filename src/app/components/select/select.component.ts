import { Option } from './../../interfaces/option.interface';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {
  @Input() placeholder: string = '';
  @Input() current: string | number = 0;
  @Input() options: Option[] = [];
  @Output() selectOption: EventEmitter<Option> = new EventEmitter<Option>();
  show: boolean = false;
  currentOption: Option;

  constructor() {}

  ngOnInit() {
    let index = this.current;
    this.currentOption = this.options[index];
    console.log(this.currentOption);
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
