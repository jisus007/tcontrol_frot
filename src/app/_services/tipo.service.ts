import { Injectable } from '@angular/core';
import { HttpClient } from '../../../node_modules/@angular/common/http';
import { Tipo } from '../_interfaces/tipo.interface';
import { Observable } from '../../../node_modules/rxjs';

@Injectable({
  providedIn: 'root'
})
export class TipoService {
  //creamoms variable API, es la direccion donde consumiremos nuestro servicios.
  public API = 'https://app-rastreo-services.herokuapp.com/';
  //public DIR_API = this.API + '/apicontroller';


  constructor(private http:HttpClient) { }

        //Creamos el metodo obtenerTodo, este metodo obtiene todos los objetos
        obtenerTodo():Observable<Tipo[]> {
          return this.http.get<Tipo[]>(this.API + '/tipos/');
        }
      
        createTipo(tipo: Tipo): Observable<Tipo> {
          return this.http.post<Tipo>(this.API+'/tipo/', tipo);
        }
      
        getTipoById(id: String) {
          console.log("id a buscar");
          console.log(id);
          return this.http.get(this.API + '/tipo/'+id);
        }
      
        updateTipo(tipo: Tipo): Observable<Tipo>  {
          return this.http.post<Tipo>(this.API+'/tipo/', tipo);
        }
  
        deleteTipo(tipo: Tipo): Observable<Tipo>   {
          console.log("en servicio")
          return this.http.post<Tipo>(this.API+'/tipo/delete/', tipo);
        }

}
