import { FooterComponent } from './footer.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    FooterComponent,
  ],
  exports: [
    FooterComponent
  ],
  schemas: [
    NO_ERRORS_SCHEMA,
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: []
})
export class FooterModule {

}
