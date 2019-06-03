import { RouterModule, Route } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AboutAdminComponent } from './aboutAdmin/about.admin.component';

const routes: Route[] = [
  { path: '', component: DashboardComponent },
  { path: 'manufacturer', loadChildren: './marka/marka.module#MarkaModule' },
  { path: 'equipment', loadChildren: './dodatnaOprema/dodatna.oprema.module#DodatnaOpremaModule' },
  { path: 'car', loadChildren: './car/car.admin.module#CarAdminModule' },
  { path: 'about', component: AboutAdminComponent },
  { path: '**', redirectTo: '' }

];

export const AdminRoutes: ModuleWithProviders = RouterModule.forChild(routes);
