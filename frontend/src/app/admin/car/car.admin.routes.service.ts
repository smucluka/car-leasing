import { CarService } from './../../_services/car.service';
import { Car } from 'src/app/_models/car';
import { RouterModule, Route, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ModuleWithProviders, Injectable } from '@angular/core';
import { CarListAdminComponent } from './carListAdmin/car.list.admin.component';
import { Observable, of } from 'rxjs';
import { first } from 'rxjs/operators';
import { CarDetailsAdminComponent } from './carDetailsAdmin/car.details.admin.component';
import { CarEditAdminComponent } from './carEditAdmin/car.edit.admin.component';

@Injectable({ providedIn: 'root' })
export class CarResolve implements Resolve<Car> {
  constructor(private service: CarService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Car> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.getOne(id).pipe(first());
    }
    return of(new Car());
  }
}

const routes: Route[] = [
  { path: '', redirectTo: 'list' },
  { path: 'list', component: CarListAdminComponent },
  { path: 'new', component: CarEditAdminComponent, resolve: { car: CarResolve } },
  { path: ':id/edit', component: CarEditAdminComponent, resolve: { car: CarResolve } },
  { path: ':id/details', component: CarDetailsAdminComponent, resolve: { car: CarResolve } },
  { path: '**', redirectTo: 'list' }

];

export const CarAdminRoutes: ModuleWithProviders = RouterModule.forChild(routes);
