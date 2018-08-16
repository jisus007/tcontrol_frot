import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators} from "@angular/forms";
import { TipoService } from '../../_services/tipo.service';
import {first} from "rxjs/operators";
import { Tipo } from '../../_interfaces/tipo.interface';

@Component({
  selector: 'app-edit-tipo',
  templateUrl: './edit-tipo.component.html',
  styleUrls: ['./edit-tipo.component.scss']
})
export class EditTipoComponent implements OnInit {

  formEditTipo: FormGroup;
  submitted: boolean = false;
  form: boolean = true;


  constructor(private formBuilder: FormBuilder,private tipoService: TipoService,private router: Router ) { }
  Id : String;
  ngOnInit() {
    this.formEditTipo = this.formBuilder.group({
      idTipo:                 [],
      descripcion:             ['',Validators.required],

    });

    this.Id = localStorage.getItem("Id");
  if(!this.Id) {
    alert("Invalid action.")
    this.router.navigate(['list-tipo']);
     return;
    }
    console.log("recuperando id")
    console.log("id"+this.Id);
    this.tipoService.getTipoById(this.Id).subscribe(data =>{

      console.log(data)
      this.formEditTipo.setValue(<Tipo>data["lista"]);
    })
  }

  onSubmit() {
    this.tipoService.updateTipo(<Tipo>this.formEditTipo.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['list-tipo']);
        },
        error => {
          alert(error);
        });
  }

  cancel(){
    this.router.navigate(['list-tipo']);
  }

  



}
