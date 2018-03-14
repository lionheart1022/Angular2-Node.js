import { Component, OnInit } from '@angular/core';
import { TargetsService } from '../../services';
import { ITargetResponse, ITarget } from '../../interfaces';
import { NotificationsService } from 'angular2-notifications';
import { ITargetFilter } from '../../interfaces/targets';

@Component({
  selector: 'app-targets',
  templateUrl: './targets.component.html',
  styleUrls: ['./targets.component.scss']
})
export class TargetsComponent implements OnInit {
  targets: ITarget[] = [];
  length: number = 0;
  pageSize: number = 10;
  pageNum: number = 0;

  constructor(
    private targetsService: TargetsService,
    private notificationService: NotificationsService) { }

  ngOnInit() {
    this.getTargets({
      pageNum: this.pageNum,
      pageSize: this.pageSize,
    });
  }

  deleteTargetById(id: string | number): void {
    this.targetsService.deleteTargetById(id).subscribe(
      () => {
        this.targets = this.targets.filter(target => target.id !== id);
        this.notificationService.success(
          'Success',
          'The target has been deleted',
        );
      },
      err => {
        console.error(err);
        this.notificationService.error(
          'Error',
          err.error.error,
        );
      }
    );
  }

  search(searchData: ITargetFilter) {
    this.getTargets({
      ...searchData,
      pageNum: this.pageNum,
      pageSize: this.pageSize,
    });
  }

  onPage(pageIndex) {
    this.pageNum = pageIndex;

    this.getTargets({
      pageNum: this.pageNum,
      pageSize: this.pageSize,
    });
  }

  private getTargets(params) {
    this.targetsService.getTargets(params)
      .subscribe(
        (data: ITargetResponse) => {
          this.targets = data.content;
          this.length = data.totalElements;
        },
        err => console.error(err),
      );
  }

}
