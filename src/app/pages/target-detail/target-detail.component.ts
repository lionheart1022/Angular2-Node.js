import { Component, OnInit } from '@angular/core';
import { TargetsService } from '../../services';
import { ActivatedRoute } from '@angular/router';
import { ITarget } from '../../interfaces/targets';

@Component({
  selector: 'app-target-detail',
  templateUrl: './target-detail.component.html',
  styleUrls: ['./target-detail.component.scss']
})
export class TargetDetailComponent implements OnInit {
  id: number;
  target: ITarget;
  targetData: object | null = null;

  constructor(
    private targetsService: TargetsService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.targetsService.getTargetById(this.id).subscribe(
        (target: ITarget) => {
          this.target = target;
          this.targetsService.addTarget(this.target);
          this.targetData = this.targetsService.getTargetData(target);
        }
      );
    });

    this.gMapInit();
  }

  private gMapInit() {
    $(function () {
        const uluru = {lat: -25.363, lng: 131.044};
        new google.maps.Map(document.getElementById('map'), {
          zoom: 4,
          center: uluru
        });
    })
}

}
