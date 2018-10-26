import { ITarget } from './../../../../interfaces/targets/target.interface';
import { Component, OnInit } from '@angular/core';
import { TargetsService } from '../../../../services/index';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
  transactions: any;

  constructor(private targetsService: TargetsService) {
    targetsService.target$.subscribe((target: ITarget) => {
      console.log(target);
      this.transactions = this.targetsService.getTargetData(target).transactions;
    });
  }

  ngOnInit() {}
}
