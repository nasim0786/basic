/*
 * Angular Imports
 */
import {
  NgModule,
  Component
} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
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
        <li><a [routerLink]="['home']">Home</a></li>
      </ul>
    </nav>

    <router-outlet></router-outlet>
  </div>
  `
})
class RoutesDemoApp {
}

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: SiteComponent },
  { path: 'overview', component: OverviewComponent },
  { path: 'sites/overview', redirectTo: 'overview' },
  { path: 'edit', component: EditComponent },
  { path: 'overview/edit', redirectTo: 'edit' },
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
    HttpModule
  ],
  bootstrap: [ RoutesDemoApp ],
  providers: [ ]
})
class RoutesDemoAppModule {}

platformBrowserDynamic().bootstrapModule(RoutesDemoAppModule)
  .catch((err: any) => console.error(err));
