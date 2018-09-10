import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators} from "@angular/forms";
import { TipoService } from '../../_services/tipo.service';
import {first} from "rxjs/operators";
import { Tipo } from '../../_interfaces/tipo.interface';
@Component({
  selector: 'app-add-tipo',
  templateUrl: './add-tipo.component.html',
  styleUrls: ['./add-tipo.component.scss']
})
export class AddTipoComponent implements OnInit {

  formAddTipo: FormGroup;
  submitted: boolean = false;
  form: boolean = true;

  status: string[] = ['A', 'B'];

  constructor(private formBuilder: FormBuilder,private tipoService: TipoService,private router: Router ) { }

  ngOnInit() {

    this.validateSesion();

    this.validateFom();
    
  }

  get f() { return this.formAddTipo.controls; }


  cancel(): void {
    this.router.navigate(['app/list-tipo']);
  };

  clean(): void {
    this.router.navigate(['app/list-tipo']);
  };


    onSubmit() {
      if (this.formAddTipo.invalid) {
        return;
    }

    this.tipoService.createTipo(<Tipo>this.formAddTipo.value)
      .subscribe( data => {
        this.router.navigate(['app/list-tipo']);
      });
    }

    validateFom(){
      this.formAddTipo = this.formBuilder.group({
        idTipo:                  ['',Validators.required],
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
