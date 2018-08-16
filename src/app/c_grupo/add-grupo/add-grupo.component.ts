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
    this.formAddGrupo = this.formBuilder.group({
      idGrupo:                 [],
      descripcion:             ['',Validators.required],

});
  }

  cancel(): void {
    this.router.navigate(['list-grupo']);
  };

  clean(): void {
    this.router.navigate(['list-grupo']);
  };


  onSubmit() {
    console.log(this.formAddGrupo.value);
    this.grupoService.createGrupo(<Grupo>this.formAddGrupo.value)
      .subscribe( data => {
        this.router.navigate(['list-grupo']);
      });
    }
}
