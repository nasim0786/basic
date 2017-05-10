import {Component} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {Service} from './service';
import { Router } from '@angular/router';

@Component({
  selector: 'home1',
  template: `
    <div>loading...</div>
    `,
    providers:[Service]
})

export class HomeComponent {

  constructor(private http: Http, service: Service, private router: Router) {
    this.router.navigate(['/sites'])
      .then(_ => service.createToken() );
  }
}
