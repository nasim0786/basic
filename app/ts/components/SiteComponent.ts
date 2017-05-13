import {Component, OnInit} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {Service} from './service';

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
                <span>Code</span>
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
                <a [routerLink]="['overview', item.id]">
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
                {{item.code}}
              </td>
              <td>
                {{item.activityStatus}}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    `,
    providers:[Service]
})
export class SiteComponent implements OnInit {
  token: string;
  list: Array<Object> = [];
  globalToken: string;

  constructor(private http: Http, private service: Service) {
  }

  getSites(): void {
    var url = 'http://localhost:8480/openspecimen/rest/ng/sites';
    this.http.get(url, this.service.jwt())
      .subscribe((res: Response) => {
        this.list = res.json();
      });
    }

  ngOnInit() {
    this.getSites();
  }
}
