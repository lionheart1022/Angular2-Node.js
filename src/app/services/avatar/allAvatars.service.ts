import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {HttpClient} from '@angular/common/http';

import { config } from '../config';

import { AuthenticationService } from '../index';
import {Observable} from "rxjs/Observable";
import {ErrorModel} from "../../models";

@Injectable()
export class AllAvatarsService {
  constructor(
    private auth: AuthenticationService,
    private http: HttpClient,
    private ErrorModel: ErrorModel,
  ) { }


  /**
   * Get all cases list
   * @return {Promise<R>|Promise<T>|Promise<void>}
   */
  handler({ pageNum, pageSize }: any): Observable<any> {
    return this.http.get(`${config.url}avatars?pagenum=${pageNum}&pagesize=${pageSize}`)
      // .map(response => response)
      .catch(this.ErrorModel.handleError);

  }
}
