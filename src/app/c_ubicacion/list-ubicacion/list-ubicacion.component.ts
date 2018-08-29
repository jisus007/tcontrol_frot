import { Component, OnInit, NgZone,ElementRef,ViewChild } from '@angular/core';
import { MapsAPILoader } from '../../../../node_modules/@agm/core';
import { Router } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-list-ubicacion',
  templateUrl: './list-ubicacion.component.html',
  styleUrls: ['./list-ubicacion.component.scss']
})
export class ListUbicacionComponent implements OnInit {

  links = ['Ultima Ubicacion','Trayecto del dia', 'Trayecto en rango de fechas'];
  activeLink = this.links[0];
  background = '';

  public latitude: number;
  public longitude: number;
  public maxSpeed: number;
  public zoom: number;
  public polyline: Array<any>;
  
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

    let loged = localStorage.getItem("loged");

    if(loged==null){
      this.router.navigate(['login']);
    }
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
    
    
    //set google maps defaults
    this.zoom = 12;
    this.maxSpeed = 10;
    this.latitude = 20.6122851,
    this.longitude = -100.4033382,

    
    this.polyline = [
    {
        latitude:  20.6122851,
        longitude: -100.4033382,
        speed: 50
    },
    {
        latitude:  20.6179661,
        longitude: -100.4125606,
        speed: 50
    },
    {
        latitude: 20.6116701,
        longitude: -100.445911,
        speed: 100
    },
    {
      latitude: 21.3198211,
      longitude: -101.1149297,
      speed: 50
    },
    {
      latitude: 20.9150524,
      longitude: -100.762212,
      speed: 50
    },

  
    ]
 
    
    //set current position
    ///this.setCurrentPosition();
    
    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {

    });
  }
  
 /* private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.watchPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }*/

}
