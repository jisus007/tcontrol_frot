import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ObjetoService } from '../_services/objeto.service';
import { Objeto } from '../_interfaces/objeto.interface';
import { MatPaginator, MatTableDataSource, MatSort} from '@angular/material';


@Component({
  selector: 'app-objeto',
  templateUrl: './objeto.component.html',
  styleUrls: ['./objeto.component.scss']
})
export class ObjetoComponent implements OnInit {

  //Creamos varibale objetos de tipo interface Objeto
 // objectos : Objeto [] = [];

  //Creamos paginator de MatPaginator
  @ViewChild(MatPaginator) paginator: MatPaginator;

  //Creamos sort de tipo MatSort
  @ViewChild(MatSort) sort: MatSort;

  //declaracion de columnas que se mostraran en la vista html : objeto.component.html
  displayedColumns: string[] = ['idObjeto','nombre', 'descripcion', 'serie','fecAlta', 'fecActualizacion','status','actions'];

  //creamos variable datasource de tipo MatTableDataSource
  dataSource = new MatTableDataSource();
  
  public isloading: boolean = true;

  
  //en el constructor inicimos nuestro Objeto service
  constructor(private objetoService: ObjetoService) { }
  
  //El metodo ngOnInit arranca al entrar a la pantalla
  ngOnInit() {
    //this.isloading = true;
    //this.isloading = false;
    this.obtenerObjetos();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort

    this.isloading = false;
  }

  //creamos metodo obtenerObjetos, este metodo obtiene todos los objetos
  public obtenerObjetos(){
    this.objetoService.obtenerTodo()
    .subscribe((data:any[])=> {
      this.dataSource.data = data;
    }
   );
  }

  //metodo applyFilter, sirve para aplicar filtros en la pantalla
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


}


