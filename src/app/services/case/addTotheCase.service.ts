import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { HttpClient } from '@angular/common/http';

import { config } from '../config';

import { AuthenticationService } from '../index';

@Injectable()

export class AddToTheCaseService {

  constructor(private auth: AuthenticationService,
    private http: HttpClient) {
  }

  /**
   *  Add target to the case
   * @param itemId
   * @param caseId
   * @param customrequestid
   * @return {Promise<R>|Promise<void>|Promise<T>}
   */
  handler(itemId: string, caseId: string, customrequestid): Promise<any> {
    const body = { 'productId': itemId, 'caseId': caseId, 'customrequestId': customrequestid };
    return this.http.post(`${config.url}cases/addDarkWebTarget`, body).toPromise();
  }
}
