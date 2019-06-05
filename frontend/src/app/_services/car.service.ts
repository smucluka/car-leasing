import { apiBaseUrl } from './../_models/constants';
import { DodatnaOprema } from './../_models/dodatna.oprema';
import { Car } from './../_models/car';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ResponseMessage, ResponseMessageCreate } from '../_models/constants';


@Injectable({ providedIn: 'root' })
export class CarService {
    constructor(private http: HttpClient) { }

    headers: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

    getAll() {
      return this.http.post<Car[]>(`${apiBaseUrl}/public/car/get-list.php`,
      {},
      { headers: this.headers })
      .pipe(map(car => {
        return car;
    }));
    }

    getOne(id: number) {
      return this.http.post<Car>(`${apiBaseUrl}/public/car/get-one.php`,
      { id },
      { headers: this.headers })
      .pipe(map(car => {
        return car;
      }));
    }

    create(car: Car, dodatnaOprema: DodatnaOprema[], carImages: any) {
      const dodOp = [];
      dodatnaOprema.forEach(d => dodOp.push(d.id));
      const formData = new FormData();
      formData.append('marka_id', car.marka_id.toString());
      formData.append('model', car.model);
      formData.append('godina_proizvodnje', car.godina_proizvodnje);
      formData.append('godina_modela', car.godina_modela);
      formData.append('kilometraza', car.kilometraza.toString());
      formData.append('motor', car.motor);
      formData.append('snaga_motora', car.snaga_motora.toString());
      formData.append('radni_obujam', car.radni_obujam.toString());
      formData.append('mjenjac', car.mjenjac);
      formData.append('broj_stupnjeva', car.broj_stupnjeva.toString());
      formData.append('potrosnja_goriva', car.potrosnja_goriva);
      formData.append('stanje_vozila', car.stanje_vozila);
      formData.append('lokacija_vozila', car.lokacija_vozila);
      formData.append('vlasnik', car.vlasnik);
      formData.append('garaziran', car.garaziran);
      formData.append('broj_vrata', car.broj_vrata.toString());
      formData.append('broj_sjedala', car.broj_sjedala.toString());
      formData.append('boja', car.boja);
      formData.append('vrsta_pogona', car.vrsta_pogona);
      formData.append('dodatna_oprema', dodOp.join(','));
      let i = 0;
      for (let file of carImages) {
        const temp: string = file.name;
        const extension = temp.substr(temp.lastIndexOf('.') + 1);
        const fileName = `${car.model}_${i}_${Date.now()}.${extension}`;
        formData.append('file' + i, file, fileName);
        i++;
      }
      return this.http.post<ResponseMessage>(`${apiBaseUrl}/admin/car/create.php`,
      formData)
      .pipe(map(message => {
        return message;
      }));
    }

    update(car: Car, dodatnaOprema: DodatnaOprema[]) {
      return this.http.post<ResponseMessage>(`${apiBaseUrl}/admin/car/update.php`,
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
      return this.http.post<ResponseMessage>(`${apiBaseUrl}/admin/car/delete.php`,
      { id },
      { headers: this.headers })
      .pipe(map(message => {
        return message;
      }));
    }
}
