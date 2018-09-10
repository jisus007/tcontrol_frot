import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GrupoService } from '../../_services/grupo.service';
import { MatPaginator, MatTableDataSource, MatSort, DateAdapter} from '@angular/material';
import { Router } from "@angular/router";
import { Grupo } from '../../_interfaces/grupo.interface';

@Component({
  selector: 'app-list-grupo',
  templateUrl: './list-grupo.component.html',
  styleUrls: ['./list-grupo.component.scss']
})
export class ListGrupoComponent implements OnInit {
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
displayedColumns: string[] = ['idGrupo','descripcion','actions'];

//creamos variable datasource de tipo MatTableDataSource
dataSource = new MatTableDataSource();

//creamos la varible isLoading para ver spinner
   isloading: boolean = false;

   //seteamos propiedades del datasource
   setDataSourceAttributes() {
     this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  constructor(private grupoService: GrupoService, private router:Router ) { }

  ngOnInit() {
    //valida la sesion
    this.validateSesion();

    this.obtenerGrupos();
  }

  public obtenerGrupos(){
    this.isloading = true;
    this.grupoService.obtenerTodo()
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
    addGrupo(): void {
      this.router.navigate(['app/add-grupo']);
    };
  
    editGrupo(grupo: Grupo): void{
      localStorage.removeItem("Id");
      localStorage.setItem("Id", grupo.idGrupo.toString());
      this.router.navigate(['app/edit-grupo']);
    }

    eliminarGrupo(grupo: Grupo): void{
      this.grupoService.deleteGrupo(grupo);
      this.router.navigate(['app/list-grupo']);
    }


    validateSesion(){
      let loged = localStorage.getItem("loged");
      if(loged==null){
        this.router.navigate(['login']);
      }
    }
}
