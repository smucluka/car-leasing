import { AdminComponent } from './../admin.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarListAdminComponent } from './carListAdmin/car.list.admin.component';
import { CarAdminRoutes } from './car.admin.routes.service';
import { CarDetailsAdminComponent } from './carDetailsAdmin/car.details.admin.component';
import { CarEditAdminComponent } from './carEditAdmin/car.edit.admin.component';

@NgModule({
    declarations: [
      CarListAdminComponent,
      CarDetailsAdminComponent,
      CarEditAdminComponent
    ],
    imports: [
        CarAdminRoutes,
        CommonModule
    ],
    providers: [
    ]
})

export class CarAdminModule { }
