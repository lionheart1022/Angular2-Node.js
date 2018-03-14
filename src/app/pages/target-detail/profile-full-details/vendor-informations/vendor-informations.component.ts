import { TargetsService } from './../../../../services/targets.service';
import { Component, OnInit } from '@angular/core';
import { ITarget, IVendorInfo } from '../../../../interfaces';

@Component({
  selector: 'app-vendor-informations',
  templateUrl: './vendor-informations.component.html',
  styleUrls: ['./vendor-informations.component.scss']
})
export class VendorInformationsComponent implements OnInit {
  info: IVendorInfo;

  constructor(private targetsService: TargetsService) {
    targetsService.target$.subscribe((target: ITarget) => {
      this.info = this.targetsService.getTargetData(target).vendor_info;
    });
  }

  ngOnInit() {
  }

}
