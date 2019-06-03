import { DodatnaOprema } from './../_models/dodatna.oprema';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ResponseMessage } from '../_models/constants';


@Injectable({ providedIn: 'root' })
export class DodatnaOpremaService {
    constructor(private http: HttpClient) { }

    headers: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

    getAll() {
      return this.http.post<DodatnaOprema[]>(`http://localhost/backend/api/admin/dodatna_oprema/get-list.php`,
      {},
      { headers: this.headers })
      .pipe(map(dodatnaOprema => {
        return dodatnaOprema;
    }));
    }

    getOne(id: number) {
      return this.http.post<DodatnaOprema>(`http://localhost/backend/api/admin/dodatna_oprema/get-one.php`,
      { id },
      { headers: this.headers })
      .pipe(map(dodatnaOprema => {
        return dodatnaOprema;
      }));
    }

    create(dodatnaOprema: DodatnaOprema) {
      return this.http.post<ResponseMessage>(`http://localhost/backend/api/admin/dodatna_oprema/create.php`,
      {
        name: dodatnaOprema.name
      },
      { headers: this.headers })
      .pipe(map(message => {
        return message;
      }));
    }

    update(dodatnaOprema: DodatnaOprema) {
      return this.http.post<ResponseMessage>(`http://localhost/backend/api/admin/dodatna_oprema/update.php`,
      {
        id: dodatnaOprema.id,
        name: dodatnaOprema.name
      },
      { headers: this.headers })
      .pipe(map(message => {
        return message;
      }));
    }

    delete(id: number) {
      return this.http.post<ResponseMessage>(`http://localhost/backend/api/admin/dodatna_oprema/delete.php`,
      { id },
      { headers: this.headers })
      .pipe(map(message => {
        return message;
      }));
    }
}
