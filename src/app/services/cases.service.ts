import { config } from './config';
import { HttpClient } from '@angular/common/http';
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
}
