import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from '../../_services/usuario.service';
import { MatPaginator, MatTableDataSource, MatSort, DateAdapter} from '@angular/material';
import { Router } from "@angular/router";
import { Usuario } from '../../_interfaces/usuario.interface';
@Component({
  selector: 'app-list-usuario',
  templateUrl: './list-usuario.component.html',
  styleUrls: ['./list-usuario.component.scss']
})
export class ListUsuarioComponent implements OnInit{

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

    //Creamos paginator de MatPaginator
  //  @ViewChild(MatPaginator) paginator: MatPaginator;

    //Creamos sort de tipo MatSort
    //@ViewChild(MatSort) sort: MatSort;

   //declaracion de columnas que se mostraran en la vista html : objeto.component.html
   displayedColumns: string[] = ['nombre','fecha','tipoLic','correo','estatus','perfil','actions']     ;
  
   //creamos variable datasource de tipo MatTableDataSource
   dataSource = new MatTableDataSource();
 
 //creamos la varible isLoading para ver spinner
      isloading: boolean = false;
      setDataSourceAttributes() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

      }
  constructor(private usuarioService: UsuarioService, private router:Router) { }

  ngOnInit() {
    let loged = localStorage.getItem("loged");

    if(loged==null){
      this.router.navigate(['login']);
    }

    this.obtenerUsuarios();
   // setTimeout(() => {this.dataSource.paginator = this.paginator});//se agrego el metodo setTimeout() ya que no estaba funcionando
    //setTimeout(() => this.dataSource.sort = this.sort);


  }  
  public obtenerUsuarios(){
    this.isloading = true;
    this.usuarioService.obtenerTodo()
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
    addUsuario(): void {
      this.router.navigate(['app/add-usuario']);
    };
  
    editUser(usuario: Usuario): void{
      localStorage.removeItem("userId");
      localStorage.setItem("userId", usuario.idUsuario.toString());
      this.router.navigate(['app/edit-usuario']);
    }

}
