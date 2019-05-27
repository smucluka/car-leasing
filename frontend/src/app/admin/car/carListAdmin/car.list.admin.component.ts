
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Car } from 'src/app/_models/car';
import { CarService } from 'src/app/_services/car.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-car-list-admin',
  templateUrl: './car.list.admin.component.html'
})
export class CarListAdminComponent implements OnInit {
  cars: Car[] = [];

  constructor(
    private router: Router,
    private carService: CarService
  ) { }

  ngOnInit() {
    this.carService.getAll().pipe(first()).subscribe(cars => {
        this.cars = cars;
    });
    console.log(this.cars);
  }

  createCar() {
    this.router.navigateByUrl('admin/car/new');
  }

  editCar(id: number) {
    this.router.navigateByUrl('admin/car/' + id + '/edit');
  }

  carDetails(id: number) {
    this.router.navigateByUrl('admin/car/' + id + '/details');
  }

  deleteCar(id: number) {

  }

}
