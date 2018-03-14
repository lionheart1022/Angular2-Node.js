import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/toPromise';
import { AuthenticationService } from '../authentication.service';
import { config } from '../config';

@Injectable()
export class ClearCaseService {

  constructor(
    private auth: AuthenticationService,
    private http: HttpClient
  ) { }

  /**
   * Delete all targets from case
   * @param caseId
   * @return {Promise<R>|Promise<void>|Promise<T>}
   */
  handle(caseId: string) {
    return this.http.get(`${config.url}cases/removeAllTgtFromCase/${caseId}`).toPromise();
  }
}
