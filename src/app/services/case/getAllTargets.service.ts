import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { HttpClient } from '@angular/common/http';

import { config } from '../config';

import { AuthenticationService } from '../index';

@Injectable()

export class GetAllTargetsService {

  public allTargerts: any[] = [];

  constructor(
    private auth: AuthenticationService,
    private http: HttpClient
  ) { }


  /**
   * Get all target from the case
   * @param caseId
   * @return {Promise<R>|Promise<T>|Promise<void>}
   */
  handler(caseId): Promise<any> {
    return this.http.get(`${config.url}cases/getCaseTargetsList/${caseId}`)
      .toPromise()
      .then((res: any[]) => {
        this.allTargerts = res;
        return this.allTargerts;
      });
  }

}
