import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Directorio } from '../_interfaces/directorio.interface';
import { Observable } from '../../../node_modules/rxjs';

@Injectable({
  providedIn: 'root'
})
export class DirectorioService {


  public API = 'http://localhost:8090';
  public DIR_API = this.API + '/apicontroller';

  username : string
  password : string
  dialogResult : string
  loged  : boolean


  constructor(private http:HttpClient) { }

   obtenerTodo() {
   
      //.subscribe((directorios:Directorio[])=>{
       //  console.log(directorios);
       // this.directorios = directorios;
       return this.http.get(this.DIR_API + '/directorios');
      
  }

  login()  {
    if(this.username == 'admin' && this.password == 'admin'){
     
      console.log("activa bandera en true")
     this.loged = true;

     //this.router.navigate(["app"]);
    }else {
      alert("Usuario invalido");
      //this.openDialog();
      this.loged = false;
    }

    return this.loged;
  }
}
