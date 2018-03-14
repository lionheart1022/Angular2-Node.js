import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/toPromise';
import { AuthenticationService } from '../authentication.service';
import { config } from '../config';

@Injectable()

export class DeleteTargetService {

  constructor(
    private auth: AuthenticationService,
    private http: HttpClient
  ) { }

  /**
   * Delete target from case
   * @param targetId
   * @param caseId
   * @return {Promise<R>|Promise<void>|Promise<T>}
   */
  handle(targetId: string, caseId: string) {
    const body = { 'caseId': caseId, 'targetId': targetId };
    return this.http.post(`${config.url}cases/removeTgtFromCase`, body).toPromise();
  }
}
