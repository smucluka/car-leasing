import { FooterModule } from './public/footer/footer.module';
import { AdminComponent } from './admin/admin.component';
import { AppRoutes } from './app.routes.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { LoginComponent } from './login/login.component';
import { SidebarModule } from './admin/sidebar/sidebar.module';
import { PublicComponent } from './public/public.component';
import { NavbarModule } from './public/navbar/navbar.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    PublicComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    SidebarModule,
    NavbarModule,
    FooterModule,
    AppRoutes
  ],
  exports: [
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class AppModule { }
