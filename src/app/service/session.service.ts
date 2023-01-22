import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() { }

  setItem(clave: string, valor: string): void{
    localStorage.setItem(clave, valor);
  }

  removeItem(clave: string): void{
    localStorage.removeItem(clave);
  }

  getItem(clave: string): string{
    return localStorage.getItem(clave);
  }

  clear(): void{
    localStorage.clear();
  }
}
