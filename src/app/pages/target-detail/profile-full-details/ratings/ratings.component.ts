import { ITarget } from './../../../../interfaces/targets/target.interface';
import { Component, OnInit } from '@angular/core';
import { IVendorInfo } from '../../../../interfaces/index';
import { TargetsService } from '../../../../services/index';

@Component({
  selector: 'app-ratings',
  templateUrl: './ratings.component.html',
  styleUrls: ['./ratings.component.scss']
})
export class RatingsComponent implements OnInit {
  info: IVendorInfo;

  constructor(private targetsService: TargetsService) {
    targetsService.target$.subscribe((target: ITarget) => {
      this.info = this.targetsService.getTargetData(target).vendor_info;
    });
  }

  ngOnInit() {
    //console.log('-----------------------------------------');
    //console.log(this);
    //this.info = <IVendorInfo>{
    //  fe_enabled: '',
    //  join_date: '',
    //  last_active: '',
    //  listings: [],
    //  pgp_key: '',
    //  ratings: [],
    //  ratings_summary: [],
    //  terms_and_conditions: '',
    //  username: '',
    //};
  }

}
