import {Component, OnInit} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import {Service} from './service';
import { Observable } from 'rxjs';

@Component({
  selector: 'contact',
  template: `
    <div class="container">
      <h1>Edit</h1>
      <form>
        <div class="form-group">
          <label for="name">Name</label>
          <input type="text" class="form-control" id="name" required [(ngModel)]="site.name" name="name" #name="ngModel">
          <div [hidden]="name.valid || name.pristine" class="alert alert-danger">
            Name is required field.
          </div>
        </div>
        <div class="form-group">
          <label for="code">Code</label>
          <input type="text" class="form-control" id="code" [(ngModel)]="site.code" name="code" #code="ngModel">
        </div>
        <div class="form-group">
          <label for="institute">Institute</label>
          <input type="text" class="form-control" id="institute" required [(ngModel)]="site.instituteName" name="institute" #institute="ngModel">
          <div [hidden]="institute.valid || institute.pristine" class="alert alert-danger">
            Institute Name is required field.
          </div>
        </div>
        <button class="btn btn-danger" (click)="submit(site)">Submit</button>
      </form>
    </div>
  `,
     providers:[Service]
})

export class EditComponent implements OnInit {
  site: Object = {};
  id: string;

  constructor(private http: Http, private router: Router, private route: ActivatedRoute, private service: Service) {
    route.params.subscribe(params => { this.id = params['id']; });
  }

  getSite(): void {
    var url = 'http://localhost:8480/openspecimen/rest/ng/sites/' + this.id;
    this.http.get(url, this.service.jwt())
      .subscribe((res: Response) => {
        this.site = res.json();
      });
  }

  editSite = (site: Object): Observable<void> =>  {
    var url = 'http://localhost:8480/openspecimen/rest/ng/sites/' + this.id;
    return this.http.put(url, JSON.stringify(site), this.service.jwt())
      .map((res: Response) => {
        this.site = res.json();
      });
  }

  submit(site: Object): void {
    this.editSite(site)
      .subscribe((data: void) => this.router.navigate(['sites/overview', this.id]));
  }

  ngOnInit() {
    this.getSite();
  }
}
