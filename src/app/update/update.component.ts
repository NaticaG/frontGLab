import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BookingService } from '../service/booking.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReservaCompletaDTO } from '../dto/ReservaCompletaDTO';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  states: string[] = ['Cancelada','Pendiente','Confirmada'];
  stateSelected: string;
  constructor(
    public dialogRef: MatDialogRef<UpdateComponent>,
    private bookingService: BookingService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public selectedBooking: ReservaCompletaDTO
  ) { }

  ngOnInit() {
  }

  selectNewState(state: string){
    console.log('selectNewState -> ' + state);
    
    this.stateSelected = state;
  }
  
  updateBooking(){
    this.selectedBooking.estado = this.stateSelected;
    this.bookingService.updateBooking(this.selectedBooking).subscribe(
      resp => {
        console.log('updateBooking - resp -> ', resp);
        
        this.dialogRef.close({response: resp});
      }, 
      error => {
        console.log('Error => ', error);
        this.openSnackBar('Error en la actualización, consulte al administrador', 'Error');
      }
    );
  }

  openSnackBar(message: string, state: string) {
    this._snackBar.open(message, state, {
      duration: 5000,
    });
  }

}
