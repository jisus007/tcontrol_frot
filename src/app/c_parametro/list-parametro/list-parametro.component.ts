import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ParametroService } from '../../_services/parametro.service';
import { MatPaginator, MatTableDataSource, MatSort, DateAdapter} from '@angular/material';
import { Router } from "@angular/router";
import { Parametro } from '../../_interfaces/parametro.interface';

@Component({
  selector: 'app-list-parametro',
  templateUrl: './list-parametro.component.html',
  styleUrls: ['./list-parametro.component.scss']
})
export class ListParametroComponent implements OnInit {
  private paginator: MatPaginator;
  private sort: MatSort;

  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
    this.setDataSourceAttributes();
  }

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }
 //declaracion de columnas que se mostraran en la vista html : objeto.component.html
 displayedColumns: string[] = ['idParametro','codigo','valor','status','fecActualizacion','actions'];
 
 //creamos variable datasource de tipo MatTableDataSource
 dataSource = new MatTableDataSource();
 
 //creamos la varible isLoading para ver spinner
    isloading: boolean = false;
    setDataSourceAttributes() {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
  
    }
   constructor(private parametroService: ParametroService, private router:Router ) { }

   ngOnInit() {
    let loged = localStorage.getItem("loged");

    if(loged==null){
      this.router.navigate(['login']);
    }
    this.obtenerParametro();
    //setTimeout(() => this.dataSource.paginator = this.paginator);//se agrego el metodo setTimeout() ya que no estaba funcionando
    //setTimeout(() => this.dataSource.sort = this.sort);
  }

  public obtenerParametro(){
    this.isloading = true;
    this.parametroService.obtenerTodo()
    .subscribe((data:any[])=> {
      this.dataSource.data = data["lista"];
    }
   );


   this.isloading = false;
}

//metodo applyFilter, sirve para aplicar filtros en la pantalla
applyFilter(filterValue: string) {
  this.dataSource.filter = filterValue.trim().toLowerCase();
}

  //metodo para ir a ventana de agregar objeto
  addParametro(): void {
    this.router.navigate(['app/add-parametro']);
  };

  editParametro(parametro: Parametro): void{

    localStorage.removeItem("Id");
    localStorage.setItem("Id", parametro.idParametro.toString());
    this.router.navigate(['app/edit-parametro']);
  }

  eliminarParametro(parametro: Parametro): void{
      console.log("eliminando grupo");
      this.parametroService.deleteParametro(parametro);
      this.router.navigate(['app/list-parametro']);
  }

}
