import { Component, OnInit } from '@angular/core';
import { DirectorioService } from '../_services/directorio.service';
import { Directorio } from '../_interfaces/directorio.interface';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss']
})
export class PersonalComponent implements OnInit {

  directorio : Directorio;

  constructor(private directorioService: DirectorioService) { }

  ngOnInit() {
    this.obtenerDirectorio();
  }

  public obtenerDirectorio(){
    this.directorioService.obtenerTodo()
    .subscribe((directorio:Directorio)=> {
      return this.directorio = directorio;
    }
  );
  
  }
}
