import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Booking } from '../entity/Booking';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BookingDTO } from '../dto/BookingDTO';
import { ReservaCompletaDTO } from '../dto/ReservaCompletaDTO';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http: HttpClient
  ) { }

  createBooking(booking: BookingDTO) {
    let params = JSON.stringify(booking);
    return this.http.post(environment.createBooking, params,
      { headers: { 'Content-Type': 'application/json' } });
  }

  updateBooking(booking: ReservaCompletaDTO): Observable<any> {
    let params = JSON.stringify(booking);
    console.log('params -> ', params);
    
    return this.http.put(environment.updateBooking, params,
      { headers: { 'Content-Type': 'application/json' } })
  }

  bookingList(): Observable<any> {
    return this.http.get(environment.bokingList,
      { headers: { 'Content-Type': 'application/json' } })
  }
}
