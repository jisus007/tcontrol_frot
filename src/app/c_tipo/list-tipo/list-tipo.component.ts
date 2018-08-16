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

  //Creamos paginator de MatPaginator
 @ViewChild(MatPaginator) paginator: MatPaginator;

 //Creamos sort de tipo MatSort
 @ViewChild(MatSort) sort: MatSort;

//declaracion de columnas que se mostraran en la vista html : objeto.component.html
displayedColumns: string[] = ['idTipo','descripcion','actions'];

//creamos variable datasource de tipo MatTableDataSource
dataSource = new MatTableDataSource();

//creamos la varible isLoading para ver spinner
   isloading: boolean = false;
  constructor(private tipoService: TipoService, private router:Router ) { }

  ngOnInit() {
    this.obtenerTipos();
    setTimeout(() => this.dataSource.paginator = this.paginator);//se agrego el metodo setTimeout() ya que no estaba funcionando
    setTimeout(() => this.dataSource.sort = this.sort);
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
      this.router.navigate(['add-tipo']);
    };
  
    editTipo(tipo: Tipo): void{

      localStorage.removeItem("Id");
      localStorage.setItem("Id", tipo.idTipo.toString());
      this.router.navigate(['edit-tipo']);
    }

    eliminarTipo(tipo: Tipo): void{
        console.log("eliminando grupo");
        this.tipoService.deleteTipo(tipo);
        this.router.navigate(['list-tipo']);
    }

}
