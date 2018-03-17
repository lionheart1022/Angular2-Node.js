import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { config } from './config';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UsersService {

  private url: string = `${config.url}users`;

  constructor(private http: HttpClient) { }

  getUser(username) {
    return this.http.get(this.getUserUrl(username))
              .map(response => response)
              .catch(this.handleError);
  }

  getUsers({ pageNum, pageSize }: any){
    let headers = new HttpHeaders();
    headers.append('Host', 'localhost:8080');
    headers.append('Content-Type', 'application/json');
    headers.append('Cache-Control', 'no-cache');
    headers.append('Postman-Token', '421c2371-b23b-8174-a46c-4235e3aff506');

    return this.http.get(`${config.url}users?pageNum=${pageNum}&pageSize=${pageSize}`, { headers: headers })
              .map(response => response)
              .catch(this.handleError);
  }

  createUser(user){
    let headers = new HttpHeaders();
    headers.append('Host', 'localhost:8080');
    headers.append('Content-Type', 'application/json');
    headers.append('Cache-Control', 'no-cache');
    headers.append('Postman-Token', '421c2371-b23b-8174-a46c-4235e3aff506');

    return this.http.post(this.url, JSON.stringify(user), {headers: headers});
  }

  updateUser(user){
    let headers = new HttpHeaders();
    headers.append('Host', 'localhost:8080');
    headers.append('Content-Type', 'application/json');
    headers.append('Cache-Control', 'no-cache');
    headers.append('Postman-Token', '6ba1745b-1d18-d692-6075-0add7b72d5b7');

    return this.http.put(this.getUserUrl(user.username), JSON.stringify(user), {headers: headers});
  }

  deleteUser(username){
    return this.http.delete(this.getUserUrl(username));
  }

  private getUserUrl(username){
    return this.url + "/" + username;
  }

  private handleError(error:any) {
    let errMsg = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}