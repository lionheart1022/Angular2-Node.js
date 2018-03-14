import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { IVendorInfo, ITarget } from '../../../../interfaces';
import { TargetsService } from '../../../../services';

@Component({
  selector: 'app-listings-from-username',
  templateUrl: './listings-from-username.component.html',
  styleUrls: ['./listings-from-username.component.scss']
})
export class ListingsFromUsernameComponent implements OnInit {
  info: IVendorInfo;
  @Output() onChanged = new EventEmitter<boolean>();

  constructor(private targetsService: TargetsService) {
    targetsService.target$.subscribe((target: ITarget) => {
      this.info = this.targetsService.getTargetData(target).vendor_info;
    });
  }

  ngOnInit() {
  }

}
