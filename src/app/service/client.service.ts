import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Person } from '../entity/Person';
import { BookingDTO } from '../dto/BookingDTO';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(
    private http: HttpClient
  ) {}

  createClient(client: Person): Observable<any>{
    let params = JSON.stringify(client);
    return this.http.post(environment.createClient, params,
      {headers: {'Content-Type': 'application/json'}});
  }

  findClient(identification: string): Observable<any>{
    return this.http.get(environment.findClient + identification,
      {headers: {'Content-Type': 'application/json'}});
  }

}
