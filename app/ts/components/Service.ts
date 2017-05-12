import {Http, Response} from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable()
export class Service {
  token: string = '';

  constructor(private _http: Http) {
  }

  public createToken = (): Observable<any[]> => {
    var user = {loginName: 'admin', password: 'Login!@3', domainName: 'openspecimen'};
    return this._http.post('http://localhost:8480/openspecimen/rest/ng/sessions', user)
      .map((response: Response) => this.token = response.json().token);
  }

  getToken(): string {
    return this.token;
  }
}
