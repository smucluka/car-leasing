import { DodatnaOprema } from './../_models/dodatna.oprema';
import { Car } from './../_models/car';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ResponseMessage } from '../_models/constants';


@Injectable({ providedIn: 'root' })
export class CarService {
    constructor(private http: HttpClient) { }

    headers: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

    getAll() {
      return this.http.post<Car[]>(`http://localhost/backend/api/public/car/get-list.php`,
      {},
      { headers: this.headers })
      .pipe(map(car => {
        return car;
    }));
    }

    getOne(id: number) {
      return this.http.post<Car>(`http://localhost/backend/api/public/car/get-one.php`,
      { id },
      { headers: this.headers })
      .pipe(map(car => {
        return car;
      }));
    }

    create(car: Car, dodatnaOprema: DodatnaOprema[]) {
      let dodOp = [];
      dodatnaOprema.forEach(d => dodOp.push(d.id));
      return this.http.post<ResponseMessage>(`http://localhost/backend/api/admin/car/create.php`,
      {
        marka_id: car.marka_id,
        model: car.model,
        godina_proizvodnje: car.godina_proizvodnje,
        godina_modela: car.godina_modela,
        kilometraza: car.kilometraza,
        motor: car.motor,
        snaga_motora: car.snaga_motora,
        radni_obujam: car.radni_obujam,
        mjenjac: car.mjenjac,
        broj_stupnjeva: car.broj_stupnjeva,
        potrosnja_goriva: car.potrosnja_goriva,
        stanje_vozila: car.stanje_vozila,
        lokacija_vozila: car.lokacija_vozila,
        vlasnik: car.vlasnik,
        garaziran: car.garaziran,
        broj_vrata: car.broj_vrata,
        broj_sjedala: car.broj_sjedala,
        boja: car.boja,
        vrsta_pogona: car.vrsta_pogona,
        dodatna_oprema: dodOp.join(',')
      },
      { headers: this.headers })
      .pipe(map(message => {
        return message;
      }));
    }

    update(car: Car, dodatnaOprema: DodatnaOprema[]) {
      return this.http.post<ResponseMessage>(`http://localhost/backend/api/admin/car/update.php`,
      {
        id: car.id,
        marka_id: car.marka_id,
        model: car.model,
        godina_proizvodnje: car.godina_proizvodnje,
        godina_modela: car.godina_modela,
        kilometraza: car.kilometraza,
        motor: car.motor,
        snaga_motora: car.snaga_motora,
        radni_obujam: car.radni_obujam,
        mjenjac: car.mjenjac,
        broj_stupnjeva: car.broj_stupnjeva,
        potrosnja_goriva: car.potrosnja_goriva,
        stanje_vozila: car.stanje_vozila,
        lokacija_vozila: car.lokacija_vozila,
        vlasnik: car.vlasnik,
        garaziran: car.garaziran,
        broj_vrata: car.broj_vrata,
        broj_sjedala: car.broj_sjedala,
        boja: car.boja,
        vrsta_pogona: car.vrsta_pogona,
        dodatna_oprema: dodatnaOprema
      },
      { headers: this.headers })
      .pipe(map(message => {
        return message;
      }));
    }

    delete(id: number) {
      return this.http.post<ResponseMessage>(`http://localhost/backend/api/admin/car/delete.php`,
      { id },
      { headers: this.headers })
      .pipe(map(message => {
        return message;
      }));
    }
}
