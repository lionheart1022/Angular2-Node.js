import { Router } from '@angular/router';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ITarget } from '../../../interfaces';
import { exist } from '../../../helpers/exist_item/exist';
import { TargetsService } from '../../../services';

@Component({
  selector: 'app-target',
  templateUrl: './target.component.html',
  styleUrls: ['./target.component.scss']
})
export class TargetComponent implements OnInit {
  @Input() target: ITarget;
  @Output() onDelete = new EventEmitter<string | number>();
  targetData: object = {};

  constructor(private targetsService: TargetsService, private router: Router) { }

  ngOnInit() {
    this.targetData = this.targetsService.getTargetData(this.target);
  }

  delete(): void {
    this.onDelete.emit(this.target.id);
  }

  navigateToTarget() {
    if(this.target.targetName === 'blockchain'){
      this.router.navigate(['/targets/blockchain', this.target.id]);
    }else{
      this.router.navigate(['/targets', this.target.id]);
    }
  }
  exist(item){
    return exist(item);
  }
}
