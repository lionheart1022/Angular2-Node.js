import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {HttpClient} from '@angular/common/http';

import { config } from '../config';

import { AuthenticationService } from '../index';
import {Observable} from "rxjs/Observable";
import {ErrorModel} from "../../models";

@Injectable()
export class EnableAvatarService {
  constructor(
    private auth: AuthenticationService,
    private http: HttpClient,
    private ErrorModel: ErrorModel,
  ) { }


  /**
   * Get all cases list
   * @return {Promise<R>|Promise<T>|Promise<void>}
   */
  handler(avatarId: string): Observable<any> {
    return this.http.get(`${config.url}avatars/enableAvatar/${avatarId}`)
      .catch(this.ErrorModel.handleError);
  }
}
