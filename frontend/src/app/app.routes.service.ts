import { HomeComponent } from './public/home/home.component';
import { AuthGuard } from './_guards/auth.guard';
import { RouterModule, Route } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { PublicComponent } from './public/public.component';

const routes: Route[] = [
  { path: '', loadChildren: './public/public.module#PublicModule', component: PublicComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin', loadChildren: './admin/admin.module#AdminModule', component: AdminComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' }

];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes, { useHash: true });
