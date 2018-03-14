import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/toPromise';
import { AuthenticationService } from '../authentication.service';
import { config } from '../config';

@Injectable()

export class DeleteCaseService {

  constructor(
    private auth: AuthenticationService,
    private http: HttpClient
  ) { }

  /**
   * Delete case
   * @param caseId
   * @return {Promise<R>|Promise<void>|Promise<T>}
   */
  handle(caseId: string) {
    return this.http.delete(`${config.url}cases/${caseId}`).toPromise();
  }
}
