import {Http, Response} from '@angular/http';
import { Injectable, OnInit } from '@angular/core';

@Injectable()
export class Service implements OnInit {
  static token: string = """;

  constructor(private http: Http) {
    console.log("service constructor");
    this.createToken();
  }

  createToken(): void {
    var user = {loginName: 'admin', password: 'Login!@3', domainName: 'openspecimen'};
    this.http.post('http://localhost:8480/openspecimen/rest/ng/sessions', user)
      .subscribe((res: Response) => {
        this.token = res.json().token;
      });
  }

  getToken(): string {
  
    return this.token;
  }
}