import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-full-details-blockchein',
  templateUrl: './profile-full-details-blockchein.component.html',
  styleUrls: ['./profile-full-details-blockchein.component.scss']
})
export class ProfileFullDetailsBlockcheinComponent implements OnInit {
  @Input() info: object;
  tabIndex: number = 0;

  constructor() {}

  ngOnInit() {}
}
