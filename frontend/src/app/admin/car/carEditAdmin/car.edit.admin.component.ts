import { MarkaService } from 'src/app/_services/marka.service';
import { DodatnaOpremaService } from 'src/app/_services/dodatna.oprema.service';
import { DodatnaOprema } from './../../../_models/dodatna.oprema';
import { Marka } from './../../../_models/marka';
import { Car } from 'src/app/_models/car';
import { MessageService } from './../../../_services/message.service';

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Action } from 'src/app/_models/constants';
import { CarService } from 'src/app/_services/car.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-car-edit-admin',
  templateUrl: './car.edit.admin.component.html'
})
export class CarEditAdminComponent implements OnInit {
  car: Car;
  action: Action;
  markaList: Marka[];
  dodatnaOpremaList: DodatnaOprema[];
  selectedDodatnaOprema: DodatnaOprema[];
  dropdownSettings = {};
  carImages: File[];

  constructor(
    protected activatedRoute: ActivatedRoute,
    private router: Router,
    private carService: CarService,
    private dodatnaOpremaService: DodatnaOpremaService,
    private markaService: MarkaService,
    public messageService: MessageService
  ) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ car }) => {
      this.car = car;
    });
    this.markaService.getAll().pipe(first()).subscribe(markaList => {
      this.markaList = markaList;
    });
    this.dodatnaOpremaService.getAll().pipe(first()).subscribe(dodatnaOpremaList => {
      this.dodatnaOpremaList = dodatnaOpremaList;
    });

    this.dropdownSettings = {
      singleSelection: false,
      placeholder: 'Odaberi',
      selectAllText: 'Označi sve',
      unSelectAllText: 'Odznači sve',
      allowSearchFilter: true,
      searchPlaceholderText: 'Traži',
      idField: 'id',
      textField: 'name'
    };

    if (this.car.id) {
      this.action = Action.EDIT;
    } else {
      this.action = Action.CREATE;
    }

  }

  public onSubmit() {

    if (this.action === Action.CREATE) {
      this.carService.create(this.car, this.selectedDodatnaOprema).subscribe(({message}) => {
        this.messageService.message = message;
        this.router.navigateByUrl('admin/car/list');
      });
    } else {
      this.carService.update(this.car, this.selectedDodatnaOprema).subscribe(({message}) => {
        this.messageService.message = message;
        this.router.navigateByUrl('admin/car/list');
      });
    }
  }

  public goBack(): void {
    this.router.navigateByUrl('admin/car');
  }

}
