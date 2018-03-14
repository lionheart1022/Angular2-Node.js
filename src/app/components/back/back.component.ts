import { Component, OnInit, Injectable } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'back',
  templateUrl: 'back.component.html',
  styleUrls: ['back.scss'],
})

@Injectable()

export class BackComponent implements OnInit {

  constructor(
    private location: Location
  ) { }

  ngOnInit() {

  }

  /**
   * Return to the previous page
   */
  goBack(): void {
    this.location.back();
  }

}
