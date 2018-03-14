import { Component, OnInit } from '@angular/core';
import {
  GetAllCasesService,
  GetAllTargetsService,
  DeleteTargetService,
  ClearCaseService,
} from '../../../services/case';
import { ActivatedRoute, Router } from '@angular/router';
import { exist } from '../../../helpers/exist_item/exist';
import { ModalService } from '../../../services/modal.service';
import { SearchService } from '../../../services';

@Component({
  selector: 'case-detail',
  templateUrl: 'case-details.component.html',
  styleUrls: ['case-details.scss']
})
export class CaseDetailComponent implements OnInit {

  public currentCase;
  public targets;
  public targetsOnlyItems: any[] = [];
  public currentTargetId;
  public currentTarget;
  public targetsBlock: boolean = false;
  public openModalConfirmTarget: boolean = false;
  public openModalConfirmCase: boolean = false;
  public titleConfirm;
  public eventButtonDeleteTarget = 'Delete';
  public eventButtonClearCase = 'Clear';
  constructor(
    private getAllCases: GetAllCasesService,
    private route: ActivatedRoute,
    private getAllTargets: GetAllTargetsService,
    private deleteTarget: DeleteTargetService,
    private clearCase: ClearCaseService,
    private modalService: ModalService,
    private searchService: SearchService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.getCase();

  }

  navigateToTarget(id: number) {
    this.router.navigate(['/targets', id]);
  }

  /**
   * Get case by id
   */
  getCase() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.getAllCases.handler()
      .then(data => {
        this.currentCase = data.filter(item => {
          return +item.id === id;
        });
        if (exist(this.currentCase[0])) {
          this.currentCase = this.currentCase[0];
          this.getTargets(this.currentCase.id);
        } else {
          console.log('case not found');
        }
      });
  }

  /**
   * Get all targets from case
   * @param caseId
   */
  getTargets(caseId) {
    this.getAllTargets.handler(caseId)
      .then(data => {
        this.targets = data;
        this.targetsBlock = true;
        this.targets.map((i) => {
          this.targetsOnlyItems.push(this.returnTargetData(i));
        });
      });
  }

  goBack(): void {
  }

  /**
   * Get target data from target object
   * @param target
   * @return {any}
   */
  returnTargetData(target) {
    return target.targetData[Object.keys(target.targetData)[0]];
  }

  /**
   * Delete target
   * @param event
   */
  deleteTargetMethod(event: boolean) {
    if (event === true) {
      this.deleteTarget.handle(this.currentTargetId, this.currentCase.id)
        .then((data: any) => {
          if (exist(data.id)) {
            this.targets = this.targets.filter(item => {
              return data.targets.indexOf(item.id) !== -1;
            });
            console.log(data, ' target deleted');
          } else {
            console.log(data, ' cant delete item from array');
          }
        });
    }
    this.openModalConfirmTarget = false;
  }

  /**
   * Open confirm dialog when deleting target
   * @param targetId
   */
  openConfirmModaleDeleteTarget(targetId: string) {
    this.currentTargetId = targetId;
    this.openModalConfirmTarget = true;
    this.titleConfirm = `Delete target ${this.currentTargetId} ?`;
  }

  /**
   * Open confirm dialog when deleting all targets
   */
  openConfirmModaleClearCase() {
    this.openModalConfirmCase = true;
    this.titleConfirm = `Clear case "${this.currentCase.name}" ?`;
  }

  /**
   * Delete all targets
   * @param event
   */
  clearCaseMethod(event: boolean) {
    if (event === true) {
      this.clearCase.handle(this.currentCase.id.toString())
        .then((data) => {
          this.targets = [];
        })
    }
    this.openModalConfirmCase = false;
  }

  /**
   * Open modal window with detail case info
   * @param id
   */
  openDetail(id: number) {
    this.currentTarget = this.targets[id];
    if (exist(this.currentTarget)) {
      this.searchService.weapons.next(this.targetsOnlyItems);
      this.modalService.weaponDetailsModal$.next(true);
      this.modalService.weaponId$.next(id);
    }
  }
}
