import { Component, OnInit, NgZone,ElementRef,ViewChild } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-ubicacion',
  templateUrl: './list-ubicacion.component.html',
  styleUrls: ['./list-ubicacion.component.scss']
})
export class ListUbicacionComponent implements OnInit {

  links = ['Ultima Ubicacion','Trayecto del dia', 'Trayecto en rango de fechas'];
  activeLink = this.links[0];
  background = '';

  public nombre : String;
    
  public status : String;
  navLinks = [
    { path: 'last-ubicacion', label: 'Ultima Ubicacion' },
    { path: 'trayecto-dia', label: 'Trayecto del dia' },
    { path: 'trayecto-fechas', label: 'Trayecto en rango de fechas' },
  ];


  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
    ,private router: Router
  ) {}
  
  ngOnInit() {

    this.validateSesion();
    this.validateStatus();

    
  }
  

  validateStatus(){
    let userId = localStorage.getItem("objId");
    let nombre = localStorage.getItem("nombre");
    let status = localStorage.getItem("status");

    this.nombre = nombre;
    this.status = status;
    if(this.status=="A"){
      this.status="ACTIVO";
    }else{
      this.status="INACTIVO";
    }
  }

  validateSesion(){
    let loged = localStorage.getItem("loged");

    if(loged==null){
      this.router.navigate(['login']);
    }
  }

}
