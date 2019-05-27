import { NavbarComponent } from './navbar.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    NavbarComponent,
  ],
  exports: [
    NavbarComponent
  ],
  schemas: [
    NO_ERRORS_SCHEMA,
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: []
})
export class NavbarModule {

}
