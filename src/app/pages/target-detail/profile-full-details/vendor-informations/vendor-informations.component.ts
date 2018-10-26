import { TargetsService } from './../../../../services/targets.service';
import { Component, OnInit } from '@angular/core';
import { ITarget, IVendorInfo } from '../../../../interfaces';
import { exist } from '../../../../helpers/exist_item/exist';

@Component({
  selector: 'app-vendor-informations',
  templateUrl: './vendor-informations.component.html',
  styleUrls: ['./vendor-informations.component.scss']
})
export class VendorInformationsComponent implements OnInit {
  info: IVendorInfo;
  open = false;

  constructor(private targetsService: TargetsService) {
    targetsService.target$.subscribe((target: ITarget) => {
      this.info = this.targetsService.getTargetData(target).vendor_info;

      console.log(this.info, 'info');
    });
  }
  exist(item){
    return exist(item);
  }
  ngOnInit() {
  }

}
