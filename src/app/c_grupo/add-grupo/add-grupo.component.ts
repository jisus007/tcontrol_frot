import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators} from "@angular/forms";
import { GrupoService } from '../../_services/grupo.service';
import {first} from "rxjs/operators";
import { Grupo } from '../../_interfaces/grupo.interface';

@Component({
  selector: 'app-add-grupo',
  templateUrl: './add-grupo.component.html',
  styleUrls: ['./add-grupo.component.scss']
})
export class AddGrupoComponent implements OnInit {

  formAddGrupo: FormGroup;
  submitted: boolean = false;
  form: boolean = true;


  constructor(private formBuilder: FormBuilder,private grupoService: GrupoService,private router: Router ) { }

  ngOnInit() {
    
    //valida la sesion
    this.validateSesion();
    
    //valida form
    this.validateFom();

  }


  get f() { return this.formAddGrupo.controls; }


  cancel(): void {
    this.router.navigate(['app/list-grupo']);
  };

  
  clean(): void {
    this.router.navigate(['app/list-grupo']);
  };


  onSubmit() {
    
    if (this.formAddGrupo.invalid) {
      return;
    }

    this.grupoService.createGrupo(<Grupo>this.formAddGrupo.value)
      .subscribe( data => {
        this.router.navigate(['app/list-grupo']);
      });
    }

    validateFom(){
      this.formAddGrupo = this.formBuilder.group({
        idGrupo:                 ['',Validators.required],
        descripcion:             ['',Validators.required],
  
       });
    }


    validateSesion(){
      let loged = localStorage.getItem("loged");
      if(loged==null){
        this.router.navigate(['login']);
      }
    }
}
