import {Component, OnInit} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';

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
        <button class="btn btn-danger" (click)="editSite(site)">Submit</button>
      </form>
    </div>
  `
})

export class EditComponent implements OnInit {
  token: string;
  site: Object = {};

  constructor(private http: Http) {
  }

  getSite(): void {
      var user = {loginName: 'admin', password: 'Login!@3', domainName: 'openspecimen'};
      this.http.post('http://localhost:8480/openspecimen/rest/ng/sessions', user)
        .subscribe((res: Response) => {
          this.token = res.json().token;

          var headers = new Headers();
          headers.append('Content-Type', 'application/json');
          headers.append('X-OS-API-TOKEN', this.token);
          var url = 'http://localhost:8480/openspecimen/rest/ng/sites/1';

          this.http.get(url, {headers: headers})
            .subscribe((res: Response) => {
              this.site = res.json();
            });
        });
    }

    editSite(site: Object): void {
      var headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('X-OS-API-TOKEN', this.token);
      var url = 'http://localhost:8480/openspecimen/rest/ng/sites/1';
console.log(this.token);
      this.http.put(url, JSON.stringify(site), {headers: headers})
        .subscribe((res: Response) => {
          this.site = res.json();
        });
    }

  ngOnInit() {
    this.getSite();
  }
}
