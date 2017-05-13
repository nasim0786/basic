import {Component, OnInit} from '@angular/core';
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

export class HomeComponent implements OnInit {
  token: any;

  constructor(private http: Http, private service: Service, private router: Router) {
  }

  private createToken(): void {
    this.service
      .login()
      .subscribe((data:void) => this.router.navigate(['/sites']));
  }

  ngOnInit() {
    this.createToken();
  }
}
