import { Component, OnInit, NgZone,ElementRef,ViewChild, HostListener, Renderer } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { Ubicacion } from '../../_interfaces/ubicacion.interface';
import { MatTableDataSource, MatPaginator, MatSort, MatDialogRef, MatDialog } from '@angular/material';
import { UbicacionService } from '../../_services/ubicacion.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { AlertComponent } from '../../alert/alert.component';


@Component({
  selector: 'app-trayecto-dia',
  templateUrl: './trayecto-dia.component.html',
  styleUrls: ['./trayecto-dia.component.scss']
})
export class TrayectoDiaComponent implements OnInit {
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
  @ViewChild('AgmMap') agmMap: any;
  @ViewChild('wrapper') wrapper: ElementRef;

//public latitude: number;
  //public longitude: number;
  private centerLat: number;
  private centerLng: number;
 // public zoom: number;

  private changeLat: number;
  private changeLng: number;
  //public latitude: number;
  //public longitude: number;
  public maxSpeed: number;
  public zoom: number;
  public polyline: Array<any>;
  fechaCovert : String;
  displayedColumns: string[] = ['fecha','descripcion','pais','latitud','longitud'];
  rows: Array<Ubicacion>;
  dataSource = new MatTableDataSource();
  isloading: boolean = false;
  
  dialogRef: MatDialogRef<AlertComponent>;
  setDataSourceAttributes() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public locations = [];

  public locationsbuild = [];
  public locationsbuild2 = [];
  public locationsbuild3 = [];

  public destinos = [];
  

  public origin: any
public destination: any ;
 

 

  public dirArr = [];
  constructor(
    public dialog: MatDialog,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private ubicacionService : UbicacionService,
    private datePipe: DatePipe
    ,private router: Router,
    private renderer: Renderer
  ) {  }
  
  ngOnInit() {

    this.validateSesion();


    this.dirArr = [];
    this.locationsbuild = [];
    this.locations = [];

 
    this.zoom = 12;
    this.maxSpeed = 10;


    let objId = localStorage.getItem("objId");

    this.getByDay(objId);

    this.mapsAPILoader.load().then(() => {

    });
  }
  
  public markerOptions = {
    origin: {
      //  icon: 'https://raw.githubusercontent.com/LuisAntonioCamacho/tcontrol_frot/master/src/assets/Map-Pin.png',
    },
    destination: {
       // icon: 'https://raw.githubusercontent.com/LuisAntonioCamacho/tcontrol_frot/master/src/assets/Map-Pin.png',
    },
}

  getByDay(objId : String){
    this.dirArr = [];
    this.locationsbuild = [];
    this.locations = [];

    this.ubicacionService.getUbicacionByDay(objId)
    .subscribe(
      (result: Array<Ubicacion>) => { 
        console.log('success', result["lista"]);
        this.rows = result["lista"];
     
        if(this.rows.length>0){
          this.dataSource.data = result["lista"];
        this.buildLocation(this.rows);
       // this.buildLocation(this.rows);
       this.origin = { lat: Number(this.rows[0].latitud), lng: Number(this.rows[0].longitud) }
       this.destination = { lat: Number(this.rows[this.rows.length-1].latitud), lng: Number(this.rows[this.rows.length-1].longitud) }

       this.locaciones(this.rows);
       this.buildDirection(this.locations);

        this.buildDirectionFinal(this.locationsbuild);

        console.log(this.dirArr);
        }else{
  
                   
          this.dialogRef = this.dialog.open(AlertComponent, {
            disableClose: false
          });
                
          this.dialogRef.componentInstance.title = "Notificación";
          this.dialogRef.componentInstance.confirmMessage = "No hay informacion del dia"
        }
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

      convertDate(fecha : Date){
        return this.fechaCovert = this.datePipe.transform(fecha, 'dd/MM/yyyy HH:mm:ss');
    
      }


      locaciones(rows: Array<Ubicacion>){
        for (let i=1; i < this.rows.length; i++){
    
          if(this.rows.length-1 != i){
            this.locations.push({ lat:Number(this.rows[i].latitud), lng: Number(this.rows[i].longitud)})
          }
        
        }
        console.log(this.locations);
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


        validateSesion(){
          let loged = localStorage.getItem("loged");
          if(loged==null){
            this.router.navigate(['login']);
          }
        }

      }