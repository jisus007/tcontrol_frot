import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialogRef, MatDialog } from '../../../../node_modules/@angular/material';
import { UbicacionService } from '../../_services/ubicacion.service';
import { Router } from '../../../../node_modules/@angular/router';
import { Ubicacion } from '../../_interfaces/ubicacion.interface';
import { DatePipe } from '../../../../node_modules/@angular/common';
import { AlertComponent } from '../../alert/alert.component';

@Component({
  selector: 'app-last-ubicacion',
  templateUrl: './last-ubicacion.component.html',
  styleUrls: ['./last-ubicacion.component.scss']
})
export class LastUbicacionComponent implements OnInit {
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

  dialogRef: MatDialogRef<AlertComponent>;

  ubicacion : Ubicacion [];

  ubicacion2 : Ubicacion

  location : Location;

  public zoom: number;
  displayedColumns: string[] = ['fecha','descripcion','pais','latitud','longitud'];
  rows: Array<Ubicacion>;
  dataSource = new MatTableDataSource();
  isloading: boolean = false;
  fechaCovert : String;
  setDataSourceAttributes() {

  }

  constructor(public dialog: MatDialog,private datePipe: DatePipe,private ubicacionService : UbicacionService, private router:Router) { }

  ngOnInit() {
    let loged = localStorage.getItem("loged");

    if(loged==null){
      this.router.navigate(['login']);
    }
    this.isloading = true;
    this.zoom = 12;
    let objId = localStorage.getItem("objId");
    this.getById(objId);

  }


  getById(objId : String){
    this.ubicacionService.getUbicacionById(+objId)
    .subscribe(
      (result: Array<Ubicacion>) => { 
        console.log('success', result["lista"]);
        this.rows = result["lista"];
        if(this.rows.length>0){
          this.dataSource.data = result["lista"];
          this.buildLocation(this.rows);
        }else{
    
          this.dialogRef = this.dialog.open(AlertComponent, {
            disableClose: false
          });
                
          this.dialogRef.componentInstance.title = "Notificación";
          this.dialogRef.componentInstance.confirmMessage = "no hay ubicaciones registradas"
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
}