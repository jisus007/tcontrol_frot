import { Injectable } from '@angular/core';
import { HttpClient } from '../../../node_modules/@angular/common/http';
import { Usuario } from '../_interfaces/usuario.interface';
import { Observable } from '../../../node_modules/rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

    //creamoms variable API, es la direccion donde consumiremos nuestro servicios.
    public API = 'https://app-rastreo-services.herokuapp.com/';
    //public DIR_API = this.API + '/apicontroller';


  constructor(private http:HttpClient) { }

    //Creamos el metodo obtenerTodo, este metodo obtiene todos los objetos
    obtenerTodo() {
      return this.http.get(this.API + '/usuarios/');
    }
  
    createUser(usuario: Usuario): Observable<Usuario> {
      return this.http.post<Usuario>(this.API+'/usuario', usuario);
    }
  
    getUserById(id: number) {
      return this.http.get(this.API + '/usuario/'+id);
    }
  
    updateUser(usuario: Usuario): Observable<Usuario>  {
      return this.http.post<Usuario>(this.API+'/usuario', usuario);
    }
}
