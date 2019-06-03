import { MarkaListComponent } from './markaList/marka.list.component';
import { RouterModule, Route, ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { ModuleWithProviders, Injectable } from '@angular/core';
import { Marka } from 'src/app/_models/marka';
import { MarkaService } from 'src/app/_services/marka.service';
import { Observable, of } from 'rxjs';
import { first } from 'rxjs/operators';
import { MarkaEditComponent } from './markaEdit/marka.edit.component';

@Injectable({ providedIn: 'root' })
export class MarkaResolve implements Resolve<Marka> {
  constructor(private service: MarkaService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Marka> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.getOne(id).pipe(first());
    }
    return of(new Marka());
  }
}

const routes: Route[] = [
  { path: '', redirectTo: 'list' },
  { path: 'list', component: MarkaListComponent },
  { path: 'new', component: MarkaEditComponent, resolve: { marka: MarkaResolve } },
  { path: ':id/edit', component: MarkaEditComponent, resolve: { marka: MarkaResolve } },
  { path: '**', redirectTo: 'list' }

];

export const MarkaRoutes: ModuleWithProviders = RouterModule.forChild(routes);
