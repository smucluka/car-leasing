import { MessageService } from './../../../_services/message.service';

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Action } from 'src/app/_models/constants';
import { Marka } from 'src/app/_models/marka';
import { MarkaService } from 'src/app/_services/marka.service';

@Component({
  selector: 'app-marka-edit-admin',
  templateUrl: './marka.edit.component.html'
})
export class MarkaEditComponent implements OnInit {
  marka: Marka;
  action: Action;

  constructor(
    protected activatedRoute: ActivatedRoute,
    private router: Router,
    private markaService: MarkaService,
    public messageService: MessageService
  ) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ marka }) => {
      this.marka = marka;
    });

    if (this.marka.id) {
      this.action = Action.EDIT;
    } else {
      this.action = Action.CREATE;
    }

  }

  public onSubmit() {
    this.marka.name.trim();

    if (this.action === Action.CREATE) {
      this.markaService.create(this.marka).subscribe(({message}) => {
        this.messageService.message = message;
        this.router.navigateByUrl('admin/manufacturer/list');
      });
    } else {
      this.markaService.update(this.marka).subscribe(({message}) => {
        this.messageService.message = message;
        this.router.navigateByUrl('admin/manufacturer/list');
      });
    }
  }

  public goBack(): void {
    this.router.navigateByUrl('admin/manufacturer');
  }

}
