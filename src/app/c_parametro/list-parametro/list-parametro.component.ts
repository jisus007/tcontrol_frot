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

  //Creamos paginator de MatPaginator
  @ViewChild(MatPaginator) paginator: MatPaginator;

  //Creamos sort de tipo MatSort
  @ViewChild(MatSort) sort: MatSort;
 
 //declaracion de columnas que se mostraran en la vista html : objeto.component.html
 displayedColumns: string[] = ['idParametro','codigo','valor','status','fecActualizacion','actions'];
 
 //creamos variable datasource de tipo MatTableDataSource
 dataSource = new MatTableDataSource();
 
 //creamos la varible isLoading para ver spinner
    isloading: boolean = false;
   constructor(private parametroService: ParametroService, private router:Router ) { }

   ngOnInit() {
    this.obtenerParametro();
    setTimeout(() => this.dataSource.paginator = this.paginator);//se agrego el metodo setTimeout() ya que no estaba funcionando
    setTimeout(() => this.dataSource.sort = this.sort);
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
    this.router.navigate(['add-parametro']);
  };

  editParametro(parametro: Parametro): void{

    localStorage.removeItem("Id");
    localStorage.setItem("Id", parametro.idParametro.toString());
    this.router.navigate(['edit-parametro']);
  }

  eliminarParametro(parametro: Parametro): void{
      console.log("eliminando grupo");
      this.parametroService.deleteParametro(parametro);
      this.router.navigate(['list-parametro']);
  }

}
