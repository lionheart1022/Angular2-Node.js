import { BehaviorSubject } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { config } from './config';
import { Observable } from 'rxjs/Observable';
import { AuditTrail } from '../interfaces/audit-trail';
import { AuditTrailResponse } from '../interfaces/audit-trail';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AuditTrailService {
  private audittrail: Subject<AuditTrail> = new BehaviorSubject<AuditTrail>(null);
  audittrail$ = this.audittrail.asObservable();
  constructor(private http: HttpClient) { }

  getAuditTrail({ pageNum, pageSize }: any): Observable<AuditTrailResponse> {
    const params = new HttpParams()
      .set('pageNum', pageNum)
      .set('pageSize', pageSize);

    return this.http.get(`${config.url}audittrail`, { params })
              .map(this.extractData)
              .catch(this.handleError);
  }

  private extractData(res:Response) {
    let body = res.json();
    return body || [];
  }

  private handleError(error:any) {
    let errMsg = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}
