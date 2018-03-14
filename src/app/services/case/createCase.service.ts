import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { HttpClient } from '@angular/common/http';

import { config } from '../config';

import { AuthenticationService } from '../index';

@Injectable()

export class CreateCaseService {
  constructor(
    private auth: AuthenticationService,
    private http: HttpClient
  ) {
  }

  /**
   * Create case
   * @param name
   * @param type
   * @return {Promise<R>|Promise<void>|Promise<T>}
   */
  handler(name: string, type: string): Promise<any> {
    const body = { name, assignedUsers: [this.auth.username], caseType: type };
    return this.http.post(`${config.url}cases`, body).toPromise();
  }
}
