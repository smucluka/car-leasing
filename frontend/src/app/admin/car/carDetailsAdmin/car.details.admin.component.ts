
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Car } from 'src/app/_models/car';
import { CarService } from 'src/app/_services/car.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-car-details-admin',
  templateUrl: './car.details.admin.component.html'
})
export class CarDetailsAdminComponent implements OnInit {
  car: Car;

  constructor(
    protected activatedRoute: ActivatedRoute,
    private router: Router,
    private carService: CarService
  ) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ car }) => {
      this.car = car;
    });
  }

  deleteCar(id: number) {

  }

  editCar(id: number) {
    this.router.navigateByUrl('admin/car/' + id + '/edit');
  }

}
