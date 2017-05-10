/*
 * Angular Imports
 */
import {
  NgModule,
  Component,
  OnInit
} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {
  RouterModule,
  Routes
} from '@angular/router';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import { HttpModule } from '@angular/http';

/*
 * Components
 */
import {HomeComponent} from 'components/HomeComponent';
import {SiteComponent} from 'components/SiteComponent';
import {OverviewComponent} from 'components/OverviewComponent';
import {EditComponent} from 'components/EditComponent';
import {Service} from 'components/Service';

/*
 * Webpack
 */
require('css/styles.css');

@Component({
  selector: 'router-app',
  template: `
  <div>
    <nav>
      <a>Navigation:</a>
      <ul>
        <li><a [routerLink]="['home']">Home</a></li>
      </ul>
    </nav>

    <router-outlet></router-outlet>
  </div>
  `
})

class RoutesDemoApp implements OnInit {

/*
  ngOnInit() {
      this.service.createToken();
    }*/
}

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'sites', component: SiteComponent },
  { path: 'sites/:id/overview', component: OverviewComponent },
  { path: 'sites/overview/:id', redirectTo: 'sites/:id/overview' },
  { path: 'sites/:id/addedit', component: EditComponent },
  { path: 'sites/:id/overview/addedit/:id', redirectTo: 'sites/:id/addedit' },
];

@NgModule({
  declarations: [
    RoutesDemoApp,
    HomeComponent,
    SiteComponent,
    OverviewComponent,
    EditComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes), // <-- routes
    HttpModule,
    FormsModule
  ],
  bootstrap: [ RoutesDemoApp ],
  providers: [Service,
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ]
})
class RoutesDemoAppModule {}

platformBrowserDynamic().bootstrapModule(RoutesDemoAppModule)
  .catch((err: any) => console.error(err));
