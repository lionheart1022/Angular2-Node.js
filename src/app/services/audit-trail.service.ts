import { BehaviorSubject } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from '@angular/http';
import { config } from './config';
import { Observable } from 'rxjs/Observable';
import { AuditTrail } from '../interfaces';
import { AuditTrailResponse } from '../interfaces';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AuditTrailService {
  private audittrail: Subject<AuditTrail> = new BehaviorSubject<AuditTrail>(null);
  audittrail$ = this.audittrail.asObservable();

  constructor(private http: HttpClient) { }

  getAuditTrail({ pageNum, pageSize }: any): Observable<AuditTrailResponse> {
    let headers = new HttpHeaders();
    headers.append('content-type', 'application/json')

    return this.http.get(`${config.url}audittrail?pagenum=${pageNum}&pagesize=${pageSize}`, { headers: headers })
              .map(response => response)
              .catch(this.handleError);
  }

  private handleError(error:any) {
    let errMsg = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}
