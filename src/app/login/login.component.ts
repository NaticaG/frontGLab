import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminDTO } from '../dto/AdminDTO';
import { AdminService } from '../service/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  adminDTO: AdminDTO = new AdminDTO();

  constructor(
    private router: Router,
    private _snackBar: MatSnackBar,
    private adminService: AdminService
  ) { }

  ngOnInit() {
  }

  async login() {
    const valido = await this.adminService.login(this.adminDTO);
    console.log(valido);
    
    if(valido){      
      this.openSnackBar('Bienvenido', 'Éxito');
      this.router.navigate(['/dashboard']);
    } else {
      this.openSnackBar('Usuario o Contraseña Incorrectos', 'Error');
    }
  }

  exit(){
    this.router.navigate(['/home']);
  }

  openSnackBar(message: string, state: string) {
    this._snackBar.open(message, state, {
      duration: 5000,
    });
  }

}
