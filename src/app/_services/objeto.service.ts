import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Objeto } from '../_interfaces/objeto.interface';
import { Observable } from '../../../node_modules/rxjs';

@Injectable({
  providedIn: 'root'
})
export class ObjetoService {

  //creamoms variable API, es la direccion donde consumiremos nuestro servicios.
  public API = 'https://app-rastreo-services.herokuapp.com/';
  //public DIR_API = this.API + '/apicontroller';

  //Agregamos al constructor http de tipo HttpClient
  constructor(private http:HttpClient) { }

  //Creamos el metodo obtenerTodo, este metodo obtiene todos los objetos
  obtenerTodo() {
    return this.http.get(this.API + '/objetos/');
  }

  createObjeto(objeto: Objeto): Observable<Objeto> {
    return this.http.post<Objeto>(this.API+'/objeto', objeto);
  }

  getObjById(id: number) {
    return this.http.get(this.API + '/objeto/'+id);
  }

  updateObj(objeto: Objeto): Observable<Objeto>  {
    return this.http.post<Objeto>(this.API+'/objeto', objeto);
  }
}
