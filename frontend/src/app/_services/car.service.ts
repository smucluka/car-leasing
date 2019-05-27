import { Car } from './../_models/car';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class CarService {
    constructor(private http: HttpClient) { }

    headers: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

    getAll() {
      return this.http.post<Car[]>(`http://localhost/backend/api/admin/car/get-list.php`, {}, { headers: this.headers })
      .pipe(map(car => {
        return car;
    }));
    }

    getOne(id: number) {
      return this.http.post<Car>(`http://localhost/backend/api/admin/car/get-one.php`, { id }, { headers: this.headers })
      .pipe(map(car => {
        return car;
      }));
    }

    create(car: Car) {
      return this.http.post<Car>(`http://localhost/backend/api/admin/car/create.php`,
      { manufacturer: car.manufacturer, model: car.model, year: car.year },
      { headers: this.headers });
    }

    update(car: Car) {
      return this.http.post<Car>(`http://localhost/backend/api/admin/car/update.php`,
      { id: car.id, manufacturer: car.manufacturer, model: car.model, year: car.year },
      { headers: this.headers });
    }

    delete(id: number) {
      return this.http.post<Car>(`http://localhost/backend/api/admin/car/delete.php`, { id }, { headers: this.headers });
    }
}
