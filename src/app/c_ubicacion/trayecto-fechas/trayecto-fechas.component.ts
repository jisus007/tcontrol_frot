import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { Ubicacion } from '../../_interfaces/ubicacion.interface';
import { MatTableDataSource, MatPaginator, MatSort, MatDialogRef, MatDialog } from '../../../../node_modules/@angular/material';
import { MapsAPILoader } from '../../../../node_modules/@agm/core';
import { UbicacionService } from '../../_services/ubicacion.service';
import { FormGroup, FormBuilder, Validators } from '../../../../node_modules/@angular/forms';
import { DatePipe } from '../../../../node_modules/@angular/common';
import { DialogComponent } from '../../dialog/dialog.component';
import { Router } from '../../../../node_modules/@angular/router';
import { AlertComponent } from '../../alert/alert.component';


@Component({
  selector: 'app-trayecto-fechas',
  templateUrl: './trayecto-fechas.component.html',
  styleUrls: ['./trayecto-fechas.component.scss']
})
export class TrayectoFechasComponent implements OnInit {
  private paginator: MatPaginator;
  private sort: MatSort;

  public latitude: number;
  public longitude: number;

  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
    this.setDataSourceAttributes();
  }

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }

  //public latitude: number;
  //public longitude: number;
  public maxSpeed: number;
  public zoom: number;
  public polyline: Array<any>;
  form: boolean = true;
  formSearch: FormGroup;
  isSearch: boolean = false;
  fechaCovert : String;

  public origin: any
public destination: any ;
 
  error:any={isError:false,errorMessage:''};

  displayedColumns: string[] = ['fecha','descripcion','pais','latitud','longitud','actions'];

  rows: Array<Ubicacion>;
  dataSource = new MatTableDataSource();
  isloading: boolean = false;

  dialogRef: MatDialogRef<AlertComponent>;
  public dir : any;


  public locations = [];

  public locationsbuild = [];
  public locationsbuild2 = [];
  public locationsbuild3 = [];

  public destinos = [];
  

  public dirArr = [];

  public dirArrOrder = [];
  public waypoints: any = []
  setDataSourceAttributes() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  constructor(
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private ubicacionService : UbicacionService,
    private datePipe: DatePipe
    ,private router: Router,
  ) {  }
  
  ngOnInit() {
  //this.origin = { lat: 24.799448, lng: 120.979021 }
  //this.destination = { lat: 24.799524, lng: 120.975017 }
  //this.dir = {};
    let loged = localStorage.getItem("loged");

    
    if(loged==null){
      this.router.navigate(['login']);
    }
    this.isSearch = false;
    this.formSearch = this.formBuilder.group({
      fechaInicio:          ['',Validators.required],
      fechaFin:             ['',Validators.required],

});

    console.log("maps");
    //set google maps defaults
    this.zoom = 12;
    this.maxSpeed = 10;
    //this.latitude = 20.6122851;
    //this.longitude = -100.4033382;

    let objId = localStorage.getItem("objId");

    //this.getByDay(objId);
    /*
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

  
    ]*/
 
    
    //set current position
    ///this.setCurrentPosition();
    
    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {

    });
  }
  
  public markerOptions = {
    origin: {
        icon: '../../../assets/Map-Pin.png',
    },
    destination: {
        icon: '../../../assets/Map-Pin.png',
    },
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
  getByDay(objId : String){

    
    this.ubicacionService.getUbicacionByDay(objId)
    .subscribe(
      (result: Array<Ubicacion>) => { 
        console.log('success', result["lista"]);
        this.rows = result["lista"];
        this.dataSource.data = result["lista"];
        this.buildLocation(this.rows);
    
      },
      (error: any) => { 
        console.log('error', error);
      },
    )
    }

    buildLocation(rows: Array<Ubicacion>){

      rows.forEach(item=>{
          this.latitude = <number>item.latitud;
          this.longitude = <number>item.longitud;
     //     this.polyline.push(item);

       //   console.log(this.polyline);
      })
    }

    ConvertString(value){
      return parseFloat(value)
      }


   onSearch() {

    if (this.formSearch.invalid) {
      return;
  }

    if(new Date(this.formSearch.controls['fechaFin'].value)>=new Date(this.formSearch.controls['fechaInicio'].value)){
    

    
    let objId = localStorage.getItem("objId");

    this.formSearch.value.fe
    this.ubicacionService.getUbicacionByFecha(<Ubicacion>this.formSearch.value, objId)
    .subscribe(
      (result: Array<Ubicacion>) => { 
      
        console.log('success', result["lista"]);
        this.rows = result["lista"];
        if(this.rows.length>0){
        this.dataSource.data = result["lista"];
        this.buildLocation(this.rows);
        this.origin = { lat: Number(this.rows[0].latitud), lng: Number(this.rows[0].longitud) }
        this.destination = { lat: Number(this.rows[this.rows.length-1].latitud), lng: Number(this.rows[this.rows.length-1].longitud) }

        //this.dir.push(this.origin);
        //this.dir.push(this.destination);

        this.locaciones(this.rows);
        this.buildDirection(this.locations);

        this.buildDirectionFinal(this.locationsbuild);

       // this.buildDirectionOrder(this.dirArr);
        //this.dirArr.push(this.origin);
       /* this.dirArr.push({
          origin: { lat: 21.6120628, lng: -100.400509 },
          destination: { lat: 20.61160, lng: -100.4940730 },
          visible: false,
        });*/
        
        //console.log(this.origin);
        //console.log(this.destination);
        console.log(this.locaciones);
        console.log(this.dirArr);
       
        this.dirArr;
        //.push = , this.rows[0].longitud
          this.isSearch = true;
        }else{
         
          this.dialogRef = this.dialog.open(AlertComponent, {
            disableClose: false
          });
                
          this.dialogRef.componentInstance.title = "Notificación";
          this.dialogRef.componentInstance.confirmMessage = "No hay informacion con el rango de fechas capturado"
        }

      },
      (error: any) => { 
        console.log('error', error);
      },
    )
 
  }else{
    this.dialogRef = this.dialog.open(AlertComponent, {
      disableClose: false
    });
          
    this.dialogRef.componentInstance.title = "Notificación";
    this.dialogRef.componentInstance.confirmMessage = "La fecha fin no puede ser menor que la fecha de inicio"
  }
  }

  onActivate(){
    this.isSearch = false;
    this.rows = new Array;
  }

  convertDate(fecha : Date){
    return this.fechaCovert = this.datePipe.transform(fecha, 'dd/MM/yyyy HH:mm:ss');

  }


  locaciones(rows: Array<Ubicacion>){
    for (let i=0; i < this.rows.length; i++){
      this.locations.push({ lat:Number(this.rows[i].latitud), lng: Number(this.rows[i].longitud) })
    }
    
  }

  buildDirection(any){
      for(let i=0; i<any.length; i++){

        this.locationsbuild.push({
          location: { lat:Number(any[i].lat), lng: Number(any[i].lng) }
        });

        this.locationsbuild2.push({
          location: { lat:Number(any[i].lat), lng: Number(any[i].lng) }
        });
      }    
    }      
  

    buildDirectionFinal(conjunto1 : any){
      let j=0;
        for(let i=-1; i<conjunto1.length; i++){
         
          if(conjunto1[i+1]!=undefined
            &&conjunto1[i+2]!=undefined
            &&conjunto1[i+1]!=undefined
            &&conjunto1[i+2]!=undefined
              ){
                console.log(conjunto1[i+1].location.lat);
                console.log(conjunto1[i+1].location.lng);
                console.log(conjunto1[i+2].location.lat);
                console.log(conjunto1[i+2].location.lng);
          this.dirArr.push( {
            id:  {j},
            origin: { lat: conjunto1[i+1].location.lat, lng: conjunto1[i+1].location.lng },
            destination: { lat: conjunto1[i+2].location.lat, lng: conjunto1[i+2].location.lng }
          })      
          
          j++;
        }
        }
    } 


    buildDirectionOrder(conjuntoDesorde : any){
        for(let i=-1; i<conjuntoDesorde.length; i++){
          
          console.log(conjuntoDesorde);
          //this.dirArrOrder.push({
           // origin: { lat: conjuntoDesorde[i+1].location.lat, lng: conjuntoDesorde[i+1].location.lng },
           // destination: { lat: conjuntoDesorde[i+2].location.lat, lng: conjuntoDesorde[i+2].location.lng }
          //})
    }
  }

}