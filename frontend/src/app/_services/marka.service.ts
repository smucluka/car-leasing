import { ResponseMessage } from './../_models/constants';
import { Marka } from './../_models/marka';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class MarkaService {
    constructor(private http: HttpClient) { }

    headers: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

    getAll() {
      return this.http.post<Marka[]>(`http://localhost/backend/api/admin/marka/get-list.php`,
      {},
      { headers: this.headers })
      .pipe(map(marka => {
        return marka;
    }));
    }

    getOne(id: number) {
      return this.http.post<Marka>(`http://localhost/backend/api/admin/marka/get-one.php`,
      { id },
      { headers: this.headers })
      .pipe(map(marka => {
        return marka;
      }));
    }

    create(marka: Marka) {
      return this.http.post<ResponseMessage>(`http://localhost/backend/api/admin/marka/create.php`,
      {
        name: marka.name
      },
      { headers: this.headers })
      .pipe(map(message => {
        return message;
      }));
    }

    update(marka: Marka) {
      return this.http.post<ResponseMessage>(`http://localhost/backend/api/admin/marka/update.php`,
      {
        id: marka.id,
        name: marka.name
      },
      { headers: this.headers })
      .pipe(map(message => {
        return message;
      }));
    }

    delete(id: number) {
      return this.http.post<ResponseMessage>(`http://localhost/backend/api/admin/marka/delete.php`,
      { id },
      { headers: this.headers })
      .pipe(map(message => {
        return message;
      }));
    }
}
