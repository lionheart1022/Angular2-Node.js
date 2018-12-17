import { CasesService } from './../../services/cases.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UUID } from 'angular2-uuid';
import { exist } from '../../helpers/exist_item/exist';
import { CreateCaseService, GetAllCasesService } from '../../services/case';
import { AuthenticationService } from '../../services';
import { debug } from 'util';

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
  active_cases: any[] = [];
  archieved_cases: any[] = [];
  openModalConfirm: boolean = false;
  public eventButton = 'Delete';

  constructor(
    private getAllCases: GetAllCasesService,
    private createCase: CreateCaseService,
    private router: Router,
    private casesService: CasesService,
    private authService: AuthenticationService,
  ) {}

  ngOnInit(): void {
    this.getAll();
    this.casesService.cases$.subscribe((cases: any) => {
      cases.forEach(c => {
        if (c.caseStatus == 'ACTIVE') {
          this.active_cases.push(c);
        }
        else {
          this.archieved_cases.push(c);
        }
      });
    });
  }

  removeDuplicates(arr, comp) {
    const unique = arr.map(e => e[comp])
      .map((e, i, final) => final.indexOf(e) === i && i)
      .filter(e => arr[e]).map(e=>arr[e]);
    return unique;
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
  showMore(selectedCase): void {
    var targetsBlock = false;
    if (selectedCase.targets.length > 0) {
      targetsBlock = true;
    }

    this.router.navigate(['/cases', selectedCase['id'], targetsBlock]);
  }

  deleteCase(event: boolean) {
    if (event === true) {
      this.casesService.deleteCaseById(this.currentCase.id).subscribe(
        () => {
          this.archieved_cases = this.archieved_cases.filter(c => c.id !== this.currentCase.id);
          var index = this.archieved_cases.indexOf(this.currentCase);
          this.archieved_cases.splice(index, 1);
        },
        err => {
          console.error(err);
          this.archieved_cases = this.archieved_cases.filter(c => c.id !== this.currentCase.id);
        }
      );
    }
    this.openModalConfirm = false;
  }

  openCase(event, caseStatus) {
    var i, casecontent, casetab;
    casecontent = document.getElementsByClassName("case__content");
    for (i=0; i<casecontent.length; i++) {
      casecontent[i].style.display = "none";
    }
    casetab = document.getElementsByClassName("case__tab");
    for (i=0; i<casetab.length; i++) {
      casetab[i].className = casetab[i].className.replace(" active", "");
    }
    document.getElementById(caseStatus).style.display = "flex";
    event.currentTarget.className += " active";
  }

  archiveCase(caseId, caseStatus) {
    this.casesService.changeCaseStatus(caseId, caseStatus).subscribe(
      () => {
        if (caseStatus == 'ARCHIVED') {
          var result = this.active_cases.find(c => {
            return c.id == caseId;
          });

          this.archieved_cases.push(result);
          this.active_cases = this.active_cases.filter(c => c.id !== caseId);
          this.active_cases.splice(caseId, 1);
        }
        else {
          var result = this.archieved_cases.find(c => {
            return c.id == caseId;
          });

          this.active_cases.push(result);
          this.archieved_cases = this.archieved_cases.filter(c => c.id !== caseId);
          this.archieved_cases.splice(caseId, 1);
        }
      },
      err => {
        console.log(err);
      }
    );
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
    if (exist(this.archieved_cases)) {
      this.archieved_cases.map((item) => {
        if (item.id == caseId) {
          this.currentCase = item;
        }
      });
    }
  }
}
