import { Component, OnInit, ViewChild } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import {Directorio} from '../_interfaces/directorio.interface';
import {MatPaginator, MatTableDataSource, MatSort} from '@angular/material';
import { DirectorioService } from '../_services/directorio.service';


@Component({
  selector: 'app-directorio',
  templateUrl: './directorio.component.html',
  styleUrls: ['./directorio.component.scss']
})
export class DirectorioComponent implements OnInit {

  directorios: Directorio[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  displayedColumns: string[] = ['nombre', 'apellidop', 'apellidom','celular', 'mail','actions'];

  
  isloading: boolean;

  constructor(private directorioService: DirectorioService) {


   }

  Directorio : Directorio;
  dataSource = new MatTableDataSource();

  ngOnInit(){
    
    this.isloading = true;
    this.obtenerDirectorio();

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort

  }

  public obtenerDirectorio(){
    this.directorioService.obtenerTodo()
    .subscribe((data:any[])=> {
      this.dataSource.data = data;
    }
  );
  this.isloading = false;
  }

 

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}