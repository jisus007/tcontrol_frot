import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TipoService } from '../../_services/tipo.service';
import { MatPaginator, MatTableDataSource, MatSort, DateAdapter} from '@angular/material';
import { Router } from "@angular/router";
import { Tipo } from '../../_interfaces/tipo.interface';


@Component({
  selector: 'app-list-tipo',
  templateUrl: './list-tipo.component.html',
  styleUrls: ['./list-tipo.component.scss']
})
export class ListTipoComponent implements OnInit {
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
displayedColumns: string[] = ['idTipo','descripcion','actions'];

//creamos variable datasource de tipo MatTableDataSource
dataSource = new MatTableDataSource();

//creamos la varible isLoading para ver spinner
   isloading: boolean = false;
   setDataSourceAttributes() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }
  constructor(private tipoService: TipoService, private router:Router ) { }

  ngOnInit() {
    let loged = localStorage.getItem("loged");

    if(loged==null){
      this.router.navigate(['login']);
    }
    this.obtenerTipos();
    //setTimeout(() => this.dataSource.paginator = this.paginator);//se agrego el metodo setTimeout() ya que no estaba funcionando
    //setTimeout(() => this.dataSource.sort = this.sort);
  }

  public obtenerTipos(){
    this.isloading = true;
    this.tipoService.obtenerTodo()
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
    addTipo(): void {
      this.router.navigate(['app/add-tipo']);
    };
  
    editTipo(tipo: Tipo): void{

      localStorage.removeItem("Id");
      localStorage.setItem("Id", tipo.idTipo.toString());
      this.router.navigate(['app/edit-tipo']);
    }

    eliminarTipo(tipo: Tipo): void{
        console.log("eliminando grupo");
        this.tipoService.deleteTipo(tipo);
        this.router.navigate(['app/list-tipo']);
    }

}
