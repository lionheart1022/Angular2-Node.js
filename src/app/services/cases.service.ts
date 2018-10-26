import { config } from './config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';

@Injectable()
export class CasesService {
  cases$ = new BehaviorSubject<any[]>([]);

  constructor(private http: HttpClient) { }

  clearCases(): void {
    this.cases$.next([]);
  }

  deleteCaseById(caseId: string): Observable<any> {
    return this.http.delete(`${config.url}cases/${caseId}`);
  }

  addCases(items) {
    this.cases$.next(this.cases$.getValue().concat(items));
  }

  addUsertoCase(username: string, caseId: string) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    const body = { 'username': username, 'caseId': caseId };
    return this.http.post(`${config.url}cases/addUserToCase`, body, {headers: headers})
              .map(response => response);
  }

  deleteUserFromCase(username: string, caseId: string) {
    return this.http.delete(`${config.url}cases/addUserToCase?username=${username}&caseId=${caseId}`);
  }

  getCases() {
    return this.http.get(`${config.url}cases`)
              .map(response => response);
  }

  getCaseForUser(userId) {
    return this.http.get(`${config.url}cases/forUser/${userId}`)
              .map(response => response);
  }
}
