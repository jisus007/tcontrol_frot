import { Injectable } from '@angular/core';
import { HttpClient } from '../../../node_modules/@angular/common/http';
import { Observable } from '../../../node_modules/rxjs';
import { Ubicacion } from '../_interfaces/ubicacion.interface';
//import 'rxjs/Rx';
import { Objeto } from '../_interfaces/objeto.interface';
@Injectable({
  providedIn: 'root'
})


export class UbicacionService {
  
//creamoms variable API, es la direccion donde consumiremos nuestro servicios.
public API = 'https://app-rastreo-services.herokuapp.com';
//public DIR_API = this.API + '/apicontroller';
data:String;
//Agregamos al constructor http de tipo HttpClient
constructor(private http:HttpClient) { }
objeto = {} as Objeto;



//Creamos el metodo obtenerTodo, este metodo obtiene todos los objetos
getUbicacionById(id: number) {
  console.log("id a buscar");
  console.log(id);
  return this.http.get<Array<Ubicacion>>(this.API + '/ultimaUbicacion/'+id, {responseType : 'json'})
}

getUbicacionByDay(id: String) {
  console.log("id a buscar");
  console.log(id);
  return this.http.get<Array<Ubicacion>>(this.API + '/ubicacionDiaActual/'+id, {responseType : 'json'})
}

getUbicacionByFecha(ubicacion: Ubicacion,id: String ) {
  console.log("id a buscar");
  //this.objeto.idObjeto = { idObjeto:id };
  
  ubicacion.idObjeto = this.objeto;
  console.log(ubicacion.fechaInicio);
  console.log(ubicacion.fechaFin);
  //console.log(ubicacion.idObjeto.idObjeto.valueOf)
  ubicacion.idObjeto.idObjeto = id;


  console.log(ubicacion);

  return this.http.post<Array<Ubicacion>>(this.API + '/ubicacionPorFecha/',ubicacion, {responseType : 'json'})

}

}
