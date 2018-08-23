import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ObjetoService } from '../_services/objeto.service';
import { Objeto } from '../_interfaces/objeto.interface';
import { MatPaginator, MatTableDataSource, MatSort, DateAdapter} from '@angular/material';
import { Router } from "@angular/router";

@Component({
  selector: 'app-objeto',
  templateUrl: './objeto.component.html',
  styleUrls: ['./objeto.component.scss']
})
export class ObjetoComponent implements OnInit {

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
  displayedColumns: string[] = ['idObjeto','nombre', 'descripcion', 'serie','fecAlta', 'fecActualizacion','status','actions'];
  

  //creamos variable datasource de tipo MatTableDataSource
  dataSource = new MatTableDataSource();

//creamos la varible isLoading para ver spinner
 isloading: boolean = false;
 setDataSourceAttributes() {
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;

}
  
  //en el constructor inicimos nuestro Objeto service
  constructor(private objetoService: ObjetoService, private router: Router) { }
  
  //El metodo ngOnInit arranca al entrar a la pantalla
  ngOnInit() {
    
    //this.isloading = false;
    this.obtenerObjetos();

    setTimeout(() => this.dataSource.paginator = this.paginator);//se agrego el metodo setTimeout() ya que no estaba funcionando
    setTimeout(() => this.dataSource.sort = this.sort);

  }
  

  //creamos metodo obtenerObjetos, este metodo obtiene todos los objetos
  public obtenerObjetos(){
    this.isloading = true;
    this.objetoService.obtenerTodo()
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
  addObjeto(): void {
    this.router.navigate(['add-objeto']);
  };

  editObjeto(objeto: Objeto): void{
    localStorage.removeItem("editUserId");
    localStorage.setItem("objId", objeto.idObjeto.toString());
    this.router.navigate(['edit-objeto']);
  }

}


