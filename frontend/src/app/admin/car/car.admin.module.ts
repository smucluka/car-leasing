import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { CarDeleteDialogComponent } from './carDeleteDialog/car.delete.dialog.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarListAdminComponent } from './carListAdmin/car.list.admin.component';
import { CarAdminRoutes } from './car.admin.routes.service';
import { CarDetailsAdminComponent } from './carDetailsAdmin/car.details.admin.component';
import { CarEditAdminComponent } from './carEditAdmin/car.edit.admin.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
      CarListAdminComponent,
      CarDetailsAdminComponent,
      CarEditAdminComponent,
      CarDeleteDialogComponent
    ],
    imports: [
        CarAdminRoutes,
        CommonModule,
        NgMultiSelectDropDownModule.forRoot(),
        FormsModule
    ],
    providers: [
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class CarAdminModule { }
