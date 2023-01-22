import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Booking } from '../entity/Booking';
import { BookingService } from '../service/booking.service';
import { UpdateComponent } from '../update/update.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SessionService } from '../service/session.service';
import { ReservaCompletaDTO } from '../dto/ReservaCompletaDTO';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  displayedColumns: string[] = ['Cliente', 'FechaReserva', 'CantidadPersonas',
    'TipoReserva', 'Observaciones', 'Estado', 'CambioEstado'];
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  matDataSource: any;

  constructor(
    private _snackBar: MatSnackBar,
    private router: Router,
    public dialogo: MatDialog,
    private bookingService: BookingService,
    private sesionService: SessionService,
  ) { }

  ngOnInit() {
    this.bookingList();
    this.validateLogin();
  }

  validateLogin(){
    let validSession = this.sesionService.getItem('session');
    if(validSession === null){
      this.router.navigate(['/home']);
    }
  }

  bookingList() {
    this.bookingService.bookingList().subscribe(
      resp => {
        this.matDataSource = new MatTableDataSource(resp);
        this.matDataSource.paginator = this.paginator;
      },
      error => {

      }
    );
  }

  changeState(booking: ReservaCompletaDTO){
    this.dialogo.open(UpdateComponent, {
      data: booking
    }).afterClosed().subscribe(
      resp => {
        console.log('changeState - resp -> ', resp);
        if(resp.response != null){
          this.openSnackBar('Actualización Exitosa', 'Éxito');
          this.bookingList();
        } else {
          this.openSnackBar('No se pudo realizar la actualización', 'Error');
        }
      }
    );
  }

  exit(){
    this.sesionService.clear();
    this.router.navigate(['/login']);
  }

  openSnackBar(message: string, state: string) {
    this._snackBar.open(message, state, {
      duration: 5000,
    });
  }
}
