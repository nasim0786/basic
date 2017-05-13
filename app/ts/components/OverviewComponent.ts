import {Component, OnInit} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import {Service} from './service';

@Component({
  selector: 'about',
  template: `
    <div>
      <button [routerLink]="['addedit', site.id]">
        <span>Edit</span>
      </button>
    </div>
    <br>
    <div>
      <div class="row">
        <div class="col-xs-3">Name:</div>
        <div class="col-xs-9  pull-left">{{site.name}}</div>
      </div>
      <div class="row">
        <div class="col-xs-3">Institute:</div>
        <div class="col-xs-9  pull-left">{{site.instituteName}}</div>
      </div>
      <div class="row">
        <div class="col-xs-3">Type:</div>
        <div class="col-xs-9  pull-left">{{site.type}}</div>
      </div>
      <div class="row">
        <div class="col-xs-3">Code:</div>
        <div class="col-xs-9  pull-left">{{site.code}}</div>
      </div>
      <div class="row">
        <div class="col-xs-3">Activity Status:</div>
        <div class="col-xs-9 pull-left">{{site.activityStatus}}</div>
      </div>
      <br>
    </div>
  `,
  providers:[Service]
})
export class OverviewComponent implements OnInit {
  token: string;
  site: Object = {};
  id: string;

  constructor(private http: Http, private route: ActivatedRoute, private service: Service) {
    route.params.subscribe(params => { this.id = params['id']; });
  }

  getSite(): void {
    var url = 'http://localhost:8480/openspecimen/rest/ng/sites/' + this.id;
    this.http.get(url, this.service.jwt())
      .subscribe((res: Response) => {
        this.site = res.json();
      });
  }

  ngOnInit() {
    this.getSite();
  }
}
