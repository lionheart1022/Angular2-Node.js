import { Component, OnInit } from '@angular/core';
import { AuditTrailService } from '../../services';
import { AuditTrail, AuditTrailResponse } from '../../interfaces';

@Component({
  selector: 'app-audit-trail',
  templateUrl: './audit-trail.component.html',
  styleUrls: ['./audit-trail.component.scss']
})
export class AuditTrailComponent implements OnInit {
  audittrail: AuditTrail[] = [];
  length: number = 0;
  pageSize: number = 10;
  pageNum: number = 0;
  constructor(private AuditTrailService: AuditTrailService) { }

  ngOnInit() {
    this.getAuditTrail({
      pageNum: this.pageNum,
      pageSize: this.pageSize,
    });
  }

  onPage(pageIndex) {
    this.pageNum = pageIndex;

    this.getAuditTrail({
      pageNum: this.pageNum,
      pageSize: this.pageSize,
    });
  }

  private getAuditTrail(params) {
    this.AuditTrailService.getAuditTrail(params)
      .subscribe(
        (data: AuditTrailResponse) => {
          this.audittrail = data.content;
          this.length = data.totalElements;
        },
        err => console.error(err),
      );
  }

}
