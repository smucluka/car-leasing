import { MarkaEditComponent } from './markaEdit/marka.edit.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarkaRoutes } from './marka.routes.service';
import { MarkaListComponent } from './markaList/marka.list.component';
import { FormsModule } from '@angular/forms';
import { MarkaDeleteDialogComponent } from './markaDeleteDialog/marka.delete.dialog.component';

@NgModule({
    declarations: [
      MarkaListComponent,
      MarkaEditComponent,
      MarkaDeleteDialogComponent
    ],
    imports: [
        MarkaRoutes,
        CommonModule,
        FormsModule
    ],
    providers: [
    ],
     schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class MarkaModule { }
