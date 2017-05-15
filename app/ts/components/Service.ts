import {Http, Response, Headers, RequestOptions} from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable()
export class Service {

  constructor(private _http: Http) {
  }

  public login = (): Observable<void> => {
    var user = {loginName: 'admin', password: 'Login!@3', domainName: 'openspecimen'};
    let token = JSON.parse(localStorage.getItem('token'));
    
    return this._http.post('http://localhost:8480/openspecimen/rest/ng/sessions', user)
      .map((response: Response) => {
        let user = response.json();
        if (user && user.token) {
          localStorage.setItem('token', JSON.stringify(user.token));
        }
      });
  }

  public jwt() {
    let token = JSON.parse(localStorage.getItem('token'));
    if (token) {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('X-OS-API-TOKEN', token);
      return new RequestOptions({ headers: headers });
    }
  }
}
