import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { CarService } from 'src/app/_services/car.service';
import { Car } from 'src/app/_models/car';
import { OnInit } from '@angular/core';


@Component({
  selector: 'app-car-list',
  templateUrl: './car.list.component.html'
})
export class CarListComponent implements OnInit {
  cars: Car[] = [];

  constructor(
    private router: Router,
    private carService: CarService
  ) { }

  ngOnInit() {
    this.carService.getAll().pipe(first()).subscribe(cars => {
        this.cars = cars;
    });
  }

  carDetails(id: number) {
  }

}
