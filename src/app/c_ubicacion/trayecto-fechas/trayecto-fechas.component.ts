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
    this.dirArr = [];
    this.locationsbuild = [];
    this.locations = [];
   
    let loged = localStorage.getItem("loged");

    
    if(loged==null){
      this.router.navigate(['login']);
    }
    this.isSearch = false;
    this.formSearch = this.formBuilder.group({
      fechaInicio:          ['',Validators.required],
      fechaFin:             ['',Validators.required],

    });

    this.zoom = 12;
    this.maxSpeed = 10;

    let objId = localStorage.getItem("objId");

    this.mapsAPILoader.load().then(() => {

    });

    this.markerOptions
  }
  
  public markerOptions = {
    origin: {
        icon: 'https://raw.githubusercontent.com/LuisAntonioCamacho/tcontrol_frot/master/src/assets/Map-Pin.png',
    },
    destination: {
        icon: 'https://raw.githubusercontent.com/LuisAntonioCamacho/tcontrol_frot/master/src/assets/Map-Pin.png',
    },
}

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
      })
    }

    ConvertString(value){
      return parseFloat(value)
      }


   onSearch() {
    //this.dirArr.;
    this.dirArr = [];
    this.locationsbuild = [];
    this.locations = [];
   
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

        this.locaciones(this.rows);
        this.buildDirection(this.locations);

        this.buildDirectionFinal(this.locationsbuild);

        console.log(this.dirArr);
       
        this.dirArr;
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
                //console.log(conjunto1[i+1].location.lat);
                //console.log(conjunto1[i+1].location.lng);
                //console.log(conjunto1[i+2].location.lat);
                //console.log(conjunto1[i+2].location.lng);
          this.dirArr.push( {
            id:  {j},
            origin: { lat: conjunto1[i+1].location.lat, lng: conjunto1[i+1].location.lng },
            destination: { lat: conjunto1[i+2].location.lat, lng: conjunto1[i+2].location.lng }
          })      
          
          j++;
        }
        }
    } 

}