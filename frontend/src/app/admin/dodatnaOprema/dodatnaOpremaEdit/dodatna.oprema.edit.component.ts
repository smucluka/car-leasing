import { MessageService } from './../../../_services/message.service';

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Action } from 'src/app/_models/constants';
import { DodatnaOprema } from 'src/app/_models/dodatna.oprema';
import { DodatnaOpremaService } from 'src/app/_services/dodatna.oprema.service';

@Component({
  selector: 'app-dodatna-oprema-edit-admin',
  templateUrl: './dodatna.oprema.edit.component.html'
})
export class DodatnaOpremaEditComponent implements OnInit {
  dodatnaOprema: DodatnaOprema;
  action: Action;

  constructor(
    protected activatedRoute: ActivatedRoute,
    private router: Router,
    private dodatnaOpremaService: DodatnaOpremaService,
    public messageService: MessageService
  ) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ dodatnaOprema }) => {
      this.dodatnaOprema = dodatnaOprema;
    });

    if (this.dodatnaOprema.id) {
      this.action = Action.EDIT;
    } else {
      this.action = Action.CREATE;
    }

  }

  public onSubmit() {
    this.dodatnaOprema.name.trim();

    if (this.action === Action.CREATE) {
      this.dodatnaOpremaService.create(this.dodatnaOprema).subscribe(({message}) => {
        this.messageService.message = message;
        this.router.navigateByUrl('admin/equipment/list');
      });
    } else {
      this.dodatnaOpremaService.update(this.dodatnaOprema).subscribe(({message}) => {
        this.messageService.message = message;
        this.router.navigateByUrl('admin/equipment/list');
      });
    }
  }

  public goBack(): void {
    this.router.navigateByUrl('admin/equipment');
  }

}
