import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';

import { config } from './config';
import { exist } from '../helpers/exist_item/exist';
import { Router, CanActivate } from '@angular/router';
import { isNull } from 'util';
import { arrayColumn } from '../helpers/array_column/array_column';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthenticationService implements CanActivate {

  username: string;
  password: string;
  roles: string;
  token: string;
  private roleAdmin = 'ROLE_ADMIN';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.token = localStorage.getItem('token');
    this.username = localStorage.getItem('username');
    this.roles = localStorage.getItem('role');
  }

  login(username: string, password: string) {
    return this.http.post(`${config.loginUrl}login?username=${username}&password=${password}`, {})
      .toPromise()
      .then((res: any) => {
        this.username = username;
        this.password = password;
        this.roles = arrayColumn(res.authorities, 0);
        this.token = res.JSESSIONID;
        localStorage.setItem('token', this.token);
        localStorage.setItem('username', username);
        localStorage.setItem('role', this.roles);
        return this.checkStatus();
      })
      .catch((error: any) => Promise.reject(error.error || 'Server error'));
  }

  checkStatus() {
    return this.http.get(`${config.url}fun`)
      .toPromise()
      .catch((error: any) => {
        this.logout();
        Promise.reject(error.error || 'Server error');
      });
  }

  logout() {
    localStorage.removeItem('token');
    this.token = null;
    this.router.navigate(['/login']);
  }

  canActivate() {
    if (isNull(localStorage.getItem('token'))) {
      this.logout();
      return false;
    };
    this.checkStatus()
      .then((data) => {
        if (!exist(data)) {
          this.logout();
          return false;
        }
      });
    return true;
    // if (!isNull(this.token)) {
    //   return true;
    // } else {
    //   this.router.navigate(["/login"]);
    //   return false;
    // }
  }

  isAdmin() {
    console.log(this.roles);
    if (!isNull(this.roles)) {
      return this.roles.indexOf(this.roleAdmin) !== -1;
    }
  }

}
