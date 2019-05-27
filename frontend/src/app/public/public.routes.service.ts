import { HomeComponent } from './home/home.component';
import { RouterModule, Route } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { AboutComponent } from './about/about.component';
import { CarListComponent } from './carList/car.list.component';

const routes: Route[] = [
  { path: '', component: HomeComponent },
  { path: 'cars', component: CarListComponent },
  { path: 'about', component: AboutComponent }
];

export const PublicRoutes: ModuleWithProviders = RouterModule.forChild(routes);
