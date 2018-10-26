import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {HttpClient} from '@angular/common/http';

import { config } from '../config';

import { AuthenticationService } from '../index';
import {Observable} from "rxjs/Observable";
import {ErrorModel} from "../../models";

@Injectable()
export class AddAvatarService {
  constructor(
    private auth: AuthenticationService,
    private http: HttpClient,
    private ErrorModel: ErrorModel,
  ) { }


  /**
   * Get all cases list
   * @return {Promise<R>|Promise<T>|Promise<void>}
   */
  handler(username: string, password:string, domain: string): Observable<any> {
      let playload = {
        username: username,
        password: password,
        domain: domain
      };
    return this.http.post(`${config.url}avatars`, playload)
      .catch(this.ErrorModel.handleError);

  }
}
