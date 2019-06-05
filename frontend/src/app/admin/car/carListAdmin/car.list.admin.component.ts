
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Car } from 'src/app/_models/car';
import { CarService } from 'src/app/_services/car.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'src/app/_services/message.service';


@Component({
  selector: 'app-car-list-admin',
  templateUrl: './car.list.admin.component.html'
})
export class CarListAdminComponent implements OnInit {
  cars: Car[] = [];
  selectedForDelete: Car = new Car();
  message: string;
  showDialog = false;

  constructor(
    protected activatedRoute: ActivatedRoute,
    private router: Router,
    private carService: CarService,
    public messageService: MessageService
  ) { }

  ngOnInit() {
    this.message = this.messageService.message;
    // TODO: auto expire
    this.messageService.message = '';

    this.carService.getAll().pipe(first()).subscribe(cars => {
        this.cars = cars;
    });
  }

  public createCar(): void {
    this.router.navigateByUrl('admin/car/new');
  }

  public editCar(id: number): void {
    this.router.navigateByUrl('admin/car/' + id + '/edit');
  }

  public carDetails(id: number): void {
    this.router.navigateByUrl('admin/car/' + id + '/details');
  }

  public selectForDelete(car: Car): void {
    this.selectedForDelete = car;
    this.showDialog = true;
  }

  public deleteCar(id: number): void {
    this.carService.delete(id).subscribe(({message}) => {
      this.message = message;
      if (message.includes('success')) {
        this.cars.splice(this.cars.indexOf(this.selectedForDelete), 1);
      }
      this.showDialog = false;
    });
  }

}
