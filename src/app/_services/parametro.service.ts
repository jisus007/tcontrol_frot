import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tipo } from '../_interfaces/tipo.interface';
import { Observable } from 'rxjs';
import { Parametro } from '../_interfaces/parametro.interface';

@Injectable({
  providedIn: 'root'
})
export class ParametroService {
  //creamoms variable API, es la direccion donde consumiremos nuestro servicios.
  public API = 'https://app-rastreo-services.herokuapp.com';
  //public DIR_API = this.API + '/apicontroller';


  constructor(private http:HttpClient) { }

        //Creamos el metodo obtenerTodo, este metodo obtiene todos los objetos
        obtenerTodo() {
          return this.http.get(this.API + '/parametros/');
        }
      
        createParametro(parametro: Parametro): Observable<Parametro> {
          
          return this.http.post<Parametro>(this.API+'/parametro/', parametro);
        }
      
        getParametroById(id: String) {
          console.log("id a buscar");
          console.log(id);
          return this.http.get(this.API + '/parametro/'+id);
        }
      
        updateParametro(parametro: Parametro): Observable<Tipo>  {
          return this.http.post<Tipo>(this.API+'/parametro/', parametro);
        }
  
        deleteParametro(parametro: Parametro): Observable<Parametro>   {
          console.log("en servicio")
          return this.http.post<Parametro>(this.API+'/parametro/delete/', parametro);
        }

}
