import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators} from "@angular/forms";
import { GrupoService } from '../../_services/grupo.service';
import {first} from "rxjs/operators";
import { Grupo } from '../../_interfaces/grupo.interface';


@Component({
  selector: 'app-edit-grupo',
  templateUrl: './edit-grupo.component.html',
  styleUrls: ['./edit-grupo.component.scss']
})
export class EditGrupoComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,private grupoService: GrupoService,private router: Router) { }

  formEditGrupo: FormGroup;
  submitted: boolean = false;
  form: boolean = true;

  Id : String;
  ngOnInit() {
 
    this.formEditGrupo = this.formBuilder.group({
      idGrupo:                 [],
      descripcion:             ['',Validators.required],

   });
  

this.Id = localStorage.getItem("Id");
  if(!this.Id) {
    alert("Invalid action.")
    this.router.navigate(['list-grupo']);
     return;
    }
    console.log("recuperando id")
    console.log("id"+this.Id);
    this.grupoService.getGrupoById(this.Id).subscribe(data =>{

      console.log(data)
      this.formEditGrupo.setValue(<Grupo>data["lista"]);
    })

  }


  onSubmit() {
    this.grupoService.updateGrupo(<Grupo>this.formEditGrupo.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['list-grupo']);
        },
        error => {
          alert(error);
        });
  }

  cancel(){
    this.router.navigate(['list-grupo']);
  }
}
