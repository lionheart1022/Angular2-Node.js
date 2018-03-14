import { CasesService } from './../cases.service';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { HttpClient } from '@angular/common/http';

import { config } from '../config';

import { AuthenticationService } from '../index';

@Injectable()
export class GetAllCasesService {
  public allCases = [];

  constructor(
    private auth: AuthenticationService,
    private http: HttpClient,
    private casesService: CasesService,
  ) { }


  /**
   * Get all cases list
   * @return {Promise<R>|Promise<T>|Promise<void>}
   */
  handler(): Promise<any> {
    console.log(this.auth.isAdmin(), ' is admin');
    if (this.auth.isAdmin()) {
      return this.http.get(`${config.url}cases`)
        .toPromise()
        .then((res: any[]) => {
          this.casesService.clearCases();
          this.allCases = res;
          return this.allCases;
        })
        .catch((error: any) => Promise.reject(error.error || 'Server error'));
    } else {
      return this.http.get(`${config.url}cases/forUser/${this.auth.username}`)
        .toPromise()
        .then((res: any[]) => {
          this.allCases = res;
          return this.allCases;
        });
    }

  }
}
