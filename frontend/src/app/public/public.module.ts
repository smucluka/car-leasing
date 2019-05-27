import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { PublicRoutes } from './public.routes.service';
import { AboutComponent } from './about/about.component';
import { CarListComponent } from './carList/car.list.component';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
      HomeComponent,
      CarListComponent,
      AboutComponent
    ],
    imports: [
        PublicRoutes,
        CommonModule
    ],
    providers: [
    ]
})

export class PublicModule { }
