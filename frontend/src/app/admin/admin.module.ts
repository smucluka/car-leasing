import { AdminComponent } from './admin.component';
import { AboutAdminComponent } from './aboutAdmin/about.admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { AdminRoutes } from './admin.routes.service';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
      DashboardComponent,
      AboutAdminComponent
    ],
    imports: [
        AdminRoutes,
        CommonModule
    ],
    providers: [
    ]
})

export class AdminModule { }
