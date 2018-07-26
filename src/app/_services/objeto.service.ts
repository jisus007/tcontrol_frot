import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Objeto } from '../_interfaces/objeto.interface';
import { Observable } from '../../../node_modules/rxjs';

@Injectable({
  providedIn: 'root'
})
export class ObjetoService {

  public API = 'http://localhost:5000';
  //public DIR_API = this.API + '/apicontroller';

  constructor(private http:HttpClient) { }

  obtenerTodo() {
    return this.http.get(this.API + '/objetos/');
  }
}
