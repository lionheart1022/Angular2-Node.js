import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-full-details',
  templateUrl: './profile-full-details.component.html',
  styleUrls: ['./profile-full-details.component.scss']
})
export class ProfileFullDetailsComponent implements OnInit {
  @Input() info: object;
  tabIndex: number = 0;

  constructor() { }

  ngOnInit() {
  }

}
