import {Component, OnInit} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';

@Component({
  selector: 'home',
  template: `
    <div *ngIf="loading">loading...</div>
      <div>
        <table class="table table-striped">
          <thead>
            <tr>
              <th>
                <span>Identifier</span>
              </th>
              <th>
                <span>Name</span>
              </th>
              <th>
                <span>Institute</span>
              </th>
              <th>
                <span>Type</span>
              </th>
              <th>
                <span>Activity Status</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let item of list">
              <td>
                {{item.id}}
              </td>
              <td>
                <a [routerLink]="['overview']">
                  <span>{{item.name}}</span>
                </a>
              </td>
              <td>
                {{item.instituteName}}
              </td>
              <td>
                {{item.type}}
              </td>
              <td>
                {{item.activityStatus}}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    `
})
export class SiteComponent implements OnInit {
  token: string;
  list: Array<Object> = [];

  constructor(private http: Http) {
  }

  getSites(): void {
      var user = {loginName: 'admin', password: 'Login!@3', domainName: 'openspecimen'};
      this.http.post('http://localhost:8480/openspecimen/rest/ng/sessions', user)
        .subscribe((res: Response) => {
          this.token = res.json().token;

          var headers = new Headers();
          headers.append('Content-Type', 'application/json');
          headers.append('X-OS-API-TOKEN', this.token);
          var url = 'http://localhost:8480/openspecimen/rest/ng/sites';

          this.http.get(url, {headers: headers})
            .subscribe((res: Response) => {
              this.list = res.json();
            });
        });
    }

  ngOnInit() {
    this.getSites();
  }
}
