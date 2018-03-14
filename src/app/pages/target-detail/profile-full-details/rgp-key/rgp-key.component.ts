import { Component, OnInit } from '@angular/core';
import { TargetsService } from '../../../../services/index';
import { ITarget, IVendorInfo } from '../../../../interfaces/index';

@Component({
  selector: 'app-rgp-key',
  templateUrl: './rgp-key.component.html',
  styleUrls: ['./rgp-key.component.scss']
})
export class RgpKeyComponent implements OnInit {
  info: IVendorInfo;

  constructor(private targetsService: TargetsService) {
    targetsService.target$.subscribe((target: ITarget) => {
      this.info = this.targetsService.getTargetData(target).vendor_info;
    });
  }

  ngOnInit() {
  }

}
