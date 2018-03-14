import { Component, OnInit } from '@angular/core';
import { TargetsService } from '../../../../services/index';
import { ITarget } from '../../../../interfaces/index';

@Component({
  selector: 'app-terms-and-conditions',
  templateUrl: './terms-and-conditions.component.html',
  styleUrls: ['./terms-and-conditions.component.scss']
})
export class TermsAndConditionsComponent implements OnInit {
  info: object;

  constructor(private targetsService: TargetsService) {
    targetsService.target$.subscribe((target: ITarget) => {
      this.info = this.targetsService.getTargetData(target);
    });
  }

  ngOnInit() {
  }

}
