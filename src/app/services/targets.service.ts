import { BehaviorSubject } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { config } from './config';
import { Observable } from 'rxjs/Observable';
import { ITargetResponse } from '../interfaces';
import { ITarget } from '../interfaces/targets';
import { Subject } from 'rxjs/Subject';
import {IExport} from "../interfaces/Export/export.interface";

@Injectable()
export class TargetsService implements IExport{
  private target: Subject<ITarget> = new BehaviorSubject<ITarget>(null);
  target$ = this.target.asObservable();

  constructor(private http: HttpClient) { }

  addTarget(target: ITarget) {
    this.target.next(target);
  }

  getTarget() {
   return this.target;
  }

  getTargets({ pageNum, pageSize }: any): Observable<ITargetResponse> {
    const params = new HttpParams()
      .set('pageNum', pageNum)
      .set('pageSize', pageSize);

    return this.http.get(`${config.url}targets`, { params });
  }

  getTargetById(id: number | string): Observable<ITarget> {
    return this.http.get(`${config.url}targets/${id}`);
  }

  deleteTargetById(id: number | string): Observable<any> {
    return this.http.delete(`${config.url}targets/${id}`);
  }

  getTargetData(target: ITarget): any {
    const [targetData = null] = (<any>Object).values(target.targetData);
    return targetData;
  }

  getTextBeforeImage(){
    //   let target = this.target;
    //   let result = {};
    // result['name'] = this.target.targetName;
    // result.name = this.target.targetName;

  }
  getItemForExport(){
    return this.target;
  }

}
