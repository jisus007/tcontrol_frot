import { Injectable } from '@angular/core';
import { HttpClient } from '../../../node_modules/@angular/common/http';
import { Grupo } from '../_interfaces/grupo.interface';
import { Observable } from '../../../node_modules/rxjs';

@Injectable({
  providedIn: 'root'
})
export class GrupoService {

    //creamoms variable API, es la direccion donde consumiremos nuestro servicios.
    public API = 'https://app-rastreo-web.herokuapp.com/';
    //public DIR_API = this.API + '/apicontroller';


  constructor(private http:HttpClient) { }

      //Creamos el metodo obtenerTodo, este metodo obtiene todos los objetos
      obtenerTodo() {
        return this.http.get(this.API + '/grupos/');
      }
    
      createGrupo(grupo: Grupo): Observable<Grupo> {
        return this.http.post<Grupo>(this.API+'/grupo', grupo);
      }
    
      getGrupoById(id: String) {
        console.log("id a buscar");
        console.log(id);
        return this.http.get(this.API + '/grupo/'+id);
      }
    
      updateGrupo(grupo: Grupo): Observable<Grupo>  {
        return this.http.post<Grupo>(this.API+'/grupo', grupo);
      }

      deleteGrupo(grupo: Grupo): Observable<Grupo>   {
        console.log("en servicio")
        return this.http.post<Grupo>(this.API+'/grupoudpate/', grupo);
      }
}
