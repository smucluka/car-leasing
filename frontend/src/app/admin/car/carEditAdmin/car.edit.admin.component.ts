
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Car } from 'src/app/_models/car';
import { CarService } from 'src/app/_services/car.service';
import { Router, ActivatedRoute } from '@angular/router';

export enum Action {
  CREATE = 'Create',
  EDIT = 'Edit'
}

@Component({
  selector: 'app-car-edit-admin',
  templateUrl: './car.edit.admin.component.html'
})
export class CarEditAdminComponent implements OnInit {
  car: Car;
  action: Action;

  constructor(
    protected activatedRoute: ActivatedRoute,
    private router: Router,
    private carService: CarService
  ) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ car }) => {
      this.car = car;
    });

    if (this.car.id) {
      this.action = Action.EDIT;
    } else {
      this.action = Action.CREATE;
    }

  }

}
