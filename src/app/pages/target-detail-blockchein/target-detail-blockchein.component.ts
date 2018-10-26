import { GoogleMapService } from './../../services/google-map.service';
import { Component, OnInit } from '@angular/core';
import { TargetsService } from '../../services';
import { ActivatedRoute } from '@angular/router';
import { ITarget } from '../../interfaces/targets';
import { exist } from '../../helpers/exist_item/exist';

@Component({
  selector: 'app-target-detail-blockchein',
  templateUrl: './target-detail-blockchein.component.html',
  styleUrls: ['./target-detail-blockchein.component.scss']
})
export class TargetDetailBlockcheinComponent implements OnInit {
  id: number;
  target: ITarget;
  targetData: any;

  constructor(
    private targetsService: TargetsService,
    private route: ActivatedRoute,
    private googleMapService: GoogleMapService
  ) {}

  ngOnInit() {
    this.getTarget();
  }

 private async getTarget(){
   const params = await this.route.params.first().toPromise();
   this.id = +params['id'];
   const target = await this.targetsService
     .getTargetById(this.id)
     .toPromise();
   this.target = target;
   this.targetsService.addTarget(this.target);
   this.targetData = this.targetsService.getTargetData(target);
 }

}
