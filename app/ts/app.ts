/*
 * Angular Imports
 */
import {
  NgModule,
  Component
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
import {SiteComponent} from 'components/SiteComponent';
import {OverviewComponent} from 'components/OverviewComponent';
import {EditComponent} from 'components/EditComponent';

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
        <li><a [routerLink]="['sites']">Home</a></li>
      </ul>
    </nav>

    <router-outlet></router-outlet>
  </div>
  `
})

class RoutesDemoApp {
}

const routes: Routes = [
  { path: '', redirectTo: 'sites', pathMatch: 'full' },
  { path: 'sites', component: SiteComponent },
  { path: 'sites/overview', redirectTo: 'about' },
  { path: 'about', component: OverviewComponent },
  { path: 'contact', component: EditComponent },
  { path: 'contactus', redirectTo: 'contact' },
  { path: 'about/contact', redirectTo: 'contact' },
];

@NgModule({
  declarations: [
    RoutesDemoApp,
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
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ]
})
class RoutesDemoAppModule {}

platformBrowserDynamic().bootstrapModule(RoutesDemoAppModule)
  .catch((err: any) => console.error(err));
