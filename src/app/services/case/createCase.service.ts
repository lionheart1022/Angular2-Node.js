import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { HttpClient } from '@angular/common/http';

import { config } from '../config';

@Injectable()

export class CreateCaseService {
  constructor(
    private http: HttpClient
  ) {
  }

  /**
   * Create case
   * @param name
   * @param userName
   * @param type
   * @return {Promise<R>|Promise<void>|Promise<T>}
   */
  handler(name: string, userName: any, type: string): Promise<any> {
    const body = { name, assignedUsers: userName, caseType: type };
    return this.http.post(`${config.url}cases`, body).toPromise();
  }
}
