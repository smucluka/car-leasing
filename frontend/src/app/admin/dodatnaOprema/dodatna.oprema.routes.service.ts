import { DodatnaOprema } from './../../_models/dodatna.oprema';
import { DodatnaOpremaListComponent } from './dodatnaOpremaList/dodatna.oprema.list.component';
import { RouterModule, Route, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ModuleWithProviders, Injectable } from '@angular/core';
import { DodatnaOpremaEditComponent } from './dodatnaOpremaEdit/dodatna.oprema.edit.component';
import { DodatnaOpremaService } from 'src/app/_services/dodatna.oprema.service';
import { Observable, of } from 'rxjs';
import { first } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class DodatnaOpremaResolve implements Resolve<DodatnaOprema> {
  constructor(private service: DodatnaOpremaService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DodatnaOprema> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.getOne(id).pipe(first());
    }
    return of(new DodatnaOprema());
  }
}

const routes: Route[] = [
  { path: '', redirectTo: 'list' },
  { path: 'list', component: DodatnaOpremaListComponent },
  { path: 'new', component: DodatnaOpremaEditComponent, resolve: { dodatnaOprema: DodatnaOpremaResolve } },
  { path: ':id/edit', component: DodatnaOpremaEditComponent, resolve: { dodatnaOprema: DodatnaOpremaResolve } },
  { path: '**', redirectTo: 'list' }

];

export const DodatnaOpremaRoutes: ModuleWithProviders = RouterModule.forChild(routes);
