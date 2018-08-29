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

  error:any={isError:false,errorMessage:''};

  displayedColumns: string[] = ['fecha','descripcion','pais','latitud','longitud','actions'];

  rows: Array<Ubicacion>;
  dataSource = new MatTableDataSource();
  isloading: boolean = false;

  dialogRef: MatDialogRef<AlertComponent>;
  
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
        this.dataSource.data = result["lista"];
        this.buildLocation(this.rows);
        if(this.rows.length>0){
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


}