import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AdminDTO } from '../dto/AdminDTO';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    private http: HttpClient,
    private sesionService: SessionService
  ) { }

  login(admin: AdminDTO) {
    let params = JSON.stringify(admin);
    return new Promise(resolve => {
      this.http.post(environment.login, params,
        { headers: { 'Content-Type': 'application/json' } }).subscribe(
          resp => {
            if(resp != null){
              resolve(true);
              this.sesionService.setItem('session', 'valid');
            } else {
              resolve(false);
            }
          },
          error => {
            resolve(false);
            console.log('usuarioService:login error: ', error);
          }
        )
    });
  }

  bookingList(): Observable<any>{
    return this.http.get(environment.bokingList, 
      { headers: { 'Content-Type': 'application/json' } })
  }
}
