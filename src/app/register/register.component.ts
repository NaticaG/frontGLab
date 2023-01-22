import { Component, OnInit } from '@angular/core';
import { Validators,FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Booking } from '../entity/Booking';
import { Person } from '../entity/Person';
import { ClientService } from '../service/client.service';
import { ThemePalette } from '@angular/material/core';
import { BookingDTO } from '../dto/BookingDTO';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BookingService } from '../service/booking.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  listadoTipoDoumentos: any[] = ['CC', 'CE', 'TI'];
  listadoTipoReserva: any[] = ['Cena', 'Almuerzo', 'Onces', 'Cumpleaños', 'Ocasión Especial'];

  tipoDocumento = new FormControl('', Validators.required);
  tipoReserva = new FormControl('', Validators.required);
  
   //Propiedades del dateTimePicker
   public disabled = false;
   public showSpinners = true;
   public showSeconds = false;
   public touchUi = false;
   public enableMeridian = false;
   public stepHour = 1;
   public stepMinute = 1;
   public stepSecond = 1;
   public color: ThemePalette = 'primary';
   //Propiedades del dateTimePicker

  client: Person = new Person();
  booking: Booking = new Booking();
  minDate: Date = new Date();

  constructor( 
    private router: Router,
    private _snackBar: MatSnackBar,
    private clientService: ClientService,
    private bookingService: BookingService
   ) { }

  ngOnInit() {}

  selectDocumentType(type: string){
    this.client.tipoDocumento = type;
  }

  selectBookingType(bookingType: string){
    this.booking.tipoReserva = bookingType;
  }

  createBooking() {    
    let bookingDTO = new BookingDTO();
    bookingDTO.booking = this.booking;
    bookingDTO.client = this.client;

    if(bookingDTO.booking.fechaReserva<this.minDate){
      this.openSnackBar('La fecha de la reserva es anterior a la fecha del sistema', 'Error');
    } else {
      this.bookingService.createBooking(bookingDTO).subscribe(
        resp => {
          console.log(resp);
          if(resp != null){
            this.openSnackBar('Reserva Generada Exitosamente', 'Éxito');
            this.router.navigate(['/home']);
            this.booking = new Booking();
            this.client = new Person();
          } else {
            this.openSnackBar('No se pudo generar la reserva.', 'Error');
          }
        }, 
        error => {  
          this.openSnackBar('Error del Sistema. Consulte con el Admin', 'Error');
          console.error('error => ', error)
        }
      );
    }
  }

  findClient(){
    this.clientService.findClient(this.client.identificacion).subscribe(
      resp => {
        if(resp != null)
          this.client = resp;
      },
      error => {
        console.error('error => ', error)
      }
    );
  }

  exit(){
    this.router.navigate(['/home']);
  }

  compareDocType(obj1: string, obj2: string) {

    if (obj1 == null || obj2 == null) {
      return false;
    }
    return obj1 === obj2;
  }

  
  openSnackBar(message: string, state: string) {
    this._snackBar.open(message, state, {
      duration: 5000,
    });
  }

}
