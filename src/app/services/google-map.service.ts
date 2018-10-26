import { Observable } from 'rxjs/Observable';
import { config } from './config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class GoogleMapService {
  constructor(private http: HttpClient) {}

  getLatlngByAddress(address: string): Observable<undefined | any> {
    // tslint:disable-next-line:curly
    if (!address) return Observable.of(null);
    return this.http
      .get(
        `${config.googleMap.apiUrl}/geocode/json?address=${address}&key=${
          config.googleMap.key
        }`
      )
      .map((data: any) => {
        let result = null;
        if (data && data.results && data.results.length) {
          result = data.results[0].geometry.location;
        }
        return result;
      });
  }
}
