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

  getAuditByUsername(userName: string, pageNum: number, pageSize:number): Observable<AuditTrailResponse> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    if (userName == 'all users') {
      return this.http.get(`${config.url}audittrail?pagenum=${pageNum}&pagesize=${pageSize}`, { headers: headers })
              .map(response => response)
              .catch(this.handleError);
    }

    return this.http.get(`${config.url}audittrail/${userName}?pagenum=${pageNum}&pagesize=${pageSize}`, { headers: headers })
            .map(response => response)
            .catch(this.handleError);   
  }

  getAuditByPeriod(dateFrom: string, dateTo: string, userName: string, pageNum: number, pageSize:number): Observable<AuditTrailResponse> {
    let headers = new HttpHeaders();
    // headers.append('Host', 'localhost:8080');
    headers.append('Content-Type', 'application/json');

    let payload = {}

    if (userName == 'all users') {
      payload = {
        'from': dateFrom,
        'to': dateTo,
        'pageNum': pageNum,
        'pageSize': pageSize
      };  
    }

    else {
      payload = {
        'from': dateFrom,
        'to': dateTo,
        'pageNum': pageNum,
        'pageSize': pageSize,
        'username': userName
      };
    }

    return this.http.post(`${config.url}audittrail/period`, payload, { headers: headers })
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
