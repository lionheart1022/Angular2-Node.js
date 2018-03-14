import { CasesService } from './../../services/cases.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UUID } from 'angular2-uuid';
import { exist } from '../../helpers/exist_item/exist';
import { CreateCaseService, GetAllCasesService } from '../../services/case';

@Component({
  selector: 'case',
  templateUrl: 'case.component.html',
  styleUrls: ['case.scss']
})

export class CaseComponent implements OnInit {
  currentCase;
  activated: boolean = false;
  errorMessage: string;
  requestId: string;
  cases: any[] = [];
  openModalConfirm: boolean = false;
  public eventButton = 'Delete';

  constructor(
    private getAllCases: GetAllCasesService,
    private createCase: CreateCaseService,
    private router: Router,
    private casesService: CasesService,
  ) {}

  ngOnInit(): void {
    this.getAll();
    this.casesService.cases$.subscribe((cases: any) => {
      this.cases = cases;
    });
  }

  /**
   * Get all cases
   */
  getAll(): void {
    this.activated = true;
    this.requestId = (UUID.UUID()).split('-').join('');
    this.getAllCases.handler()
      .then((data: any[]) => {
        this.casesService.addCases(data);
      })
      .catch(error => {
        this.errorMessage = <any>error;
        this.activated = false;
      });
  }

  /**
   * Show all targets of the case
   * @param id
   */
  showMore(id): void {
    this.router.navigate(['/cases', id]);
  }

  deleteCase(event: boolean) {
    if (event === true) {
      this.casesService.deleteCaseById(this.currentCase.id).subscribe(
        () => {
          this.cases = this.cases.filter(c => c.id !== this.currentCase.id);
        },
        err => {
          console.error(err);
          this.cases = this.cases.filter(c => c.id !== this.currentCase.id);
        }
      );
    }
    this.openModalConfirm = false;
  }

  /**
   * Open confirm dialog
   * @param caseId
   */
  openConfirmModale(caseId: string) {
    this.getCaseById(caseId);
    this.openModalConfirm = true;
  }

  /**
   * Get case by case id
   * @param caseId
   */
  getCaseById(caseId) {
    if (exist(this.cases)) {
      this.cases.map((item) => {
        if (item.id == caseId) {
          this.currentCase = item;
        }
      });
    }
  }
}
