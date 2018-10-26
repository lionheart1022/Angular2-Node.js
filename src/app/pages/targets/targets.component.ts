import { Component, OnInit, Output } from '@angular/core';
import { TargetsService } from '../../services';
import { ITargetResponse, ITarget } from '../../interfaces';
import { NotificationsService } from 'angular2-notifications';
import { ITargetFilter } from '../../interfaces/targets';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-targets',
  templateUrl: './targets.component.html',
  styleUrls: ['./targets.component.scss']
})
export class TargetsComponent implements OnInit, Output {
  loading: boolean = false;
  reLoading: boolean = false;
  eventButtonDeleteTarget = 'Delete';
  openModalConfirmTarget: boolean = false;
  targets: ITarget[] = [];
  currentTargetId: string;
  length: number = 0;
  pageSize: number = 15;
  pageNum: number = 0;
  titleConfirm:string;

  constructor(
    private targetsService: TargetsService,
    private notificationService: NotificationsService,
    private router: Router,
  ) { }


  ngOnInit() {
    this.getTargets({
      pageNum: this.pageNum,
      pageSize: this.pageSize,
    });
  }

  deleteTargetById(event: boolean): void {
    if(event === true){
      this.targetsService.deleteTargetById(this.currentTargetId).subscribe(
        () => {
          this.targets = this.targets.filter(target => target.id !== this.currentTargetId);
          this.notificationService.success(
            'Success',
            'The target has been deleted',
          );
        },
        err => {
          console.error(err);
          this.targets = this.targets.filter(target => target.id !== this.currentTargetId);
          this.notificationService.success(
            'Success',
            'The target has been deleted',
          );
        }
      );
    }
    this.openModalConfirmTarget = false;
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
      pageNum: this.pageNum - 1,
      pageSize: this.pageSize,
    });
  }

  updatePageSize(size){
    this.pageSize = size.id;
    this.reLoading  = true;
    this.getTargets({
      pageNum: 0,
      pageSize: this.pageSize,
    });
  }

  navigateToTarget(id: number, name: string) {
    console.log(name, 'target name');
    if(name === 'blockchain'){
      this.router.navigate(['/targets/blockchain', id]);
    }else{
      this.router.navigate(['/targets', id]);
    }  }

  /**
   * Open confirm dialog when deleting target
   * @param targetId
   */
  openConfirmModaleDeleteTarget(targetId: string) {
    this.currentTargetId = targetId;
    this.openModalConfirmTarget = true;
    this.titleConfirm = `Delete target ${this.currentTargetId} ?`;
  }
  private getTargets(params) {
    this.loading = true;
    this.targetsService.getTargets(params)
      .subscribe(
        (data: ITargetResponse) => {
          console.log(data.content);
          this.targets = data.content;
          this.length = data.totalElements;
          this.loading = false;
          this.reLoading  = false;
        },
        err => console.error(err),
      );
  }


}
