import { DodatnaOpremaEditComponent } from './dodatnaOpremaEdit/dodatna.oprema.edit.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DodatnaOpremaListComponent } from './dodatnaOpremaList/dodatna.oprema.list.component';
import { FormsModule } from '@angular/forms';
import { DodatnaOpremaRoutes } from './dodatna.oprema.routes.service';
import { DodatnaOpremaDeleteDialogComponent } from './dodatnaOpremaDeleteDialog/dodatna.oprema.delete.dialog.component';

@NgModule({
    declarations: [
      DodatnaOpremaListComponent,
      DodatnaOpremaEditComponent,
      DodatnaOpremaDeleteDialogComponent
    ],
    imports: [
        DodatnaOpremaRoutes,
        CommonModule,
        FormsModule
    ],
    providers: [
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class DodatnaOpremaModule { }
