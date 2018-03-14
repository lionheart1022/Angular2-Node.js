import { Component } from '@angular/core';

@Component({
  selector: 'content',
  templateUrl: 'content.component.html',
  styleUrls: ['content.scss']
})

export class ContentComponent {
  options = {
    timeOut: 5000,
    showProgressBar: false,
    pauseOnHover: false,
    clickToClose: false,
    maxLength: 3,
  };

  constructor(
  ) { }

}
