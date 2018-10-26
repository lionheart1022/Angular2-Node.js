import { GoogleMapService } from './../../services/google-map.service';
import { Component, OnInit } from '@angular/core';
import { TargetsService } from '../../services';
import { ActivatedRoute } from '@angular/router';
import { ITarget } from '../../interfaces/targets';
import { exist } from '../../helpers/exist_item/exist';

@Component({
  selector: 'app-target-detail',
  templateUrl: './target-detail.component.html',
  styleUrls: ['./target-detail.component.scss']
})
export class TargetDetailComponent implements OnInit {
  id: number;
  target: ITarget;
  targetData: any;
  showMarker: boolean = true;
  loading: boolean = true;
  mapOptions: any = {
    location: {
      lat: 41.311081,
      lng: 69.240562
    },
    zoom: 8
  };

  constructor(
    private targetsService: TargetsService,
    private route: ActivatedRoute,
    private googleMapService: GoogleMapService
  ) {}

  ngOnInit() {
    this.getCoordinates();
  }

  isWorldwide(ships: string) {
    const rg = new RegExp('Worldwide', 'ig');
    return rg.test(ships);
  }
  exist(item){
    return exist(item);
  }
  private async getCoordinates() {
    try {
      const params = await this.route.params.first().toPromise();
      this.id = +params['id'];

      const target = await this.targetsService
        .getTargetById(this.id)
        .toPromise();
      this.target = target;
      console.log(target);
      this.targetsService.addTarget(this.target);
      this.targetData = this.targetsService.getTargetData(target);
      this.loading = false;
      let address = '';

      if (!this.isWorldwide(this.targetData.ships_from)) {
        address = this.targetData.ships_from;
      } else if (!this.isWorldwide(this.targetData.ships_to)) {
        address = this.targetData.ships_to;
      }

      const result = await this.googleMapService
        .getLatlngByAddress(address)
        .toPromise();

      if (result) {
        this.mapOptions.location = result;
      } else {
        this.mapOptions.zoom = 2;
        this.showMarker = false;
      }
    } catch (err) {
      console.error(err);
    }
  }
}
