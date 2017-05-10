import {Http, Response} from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class Service {
  static token: string;

  constructor(private http: Http) {
  }

  createToken(): any {
    var user = {loginName: 'admin', password: 'Login!@3', domainName: 'openspecimen'};
    return this.http.post('http://localhost:8480/openspecimen/rest/ng/sessions', user)
      .subscribe((res: Response) => {
        this.token = res.json().token;
        return this.token;
      });
  }

  getToken(): string {
    return this.token;
  }
}
