import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators} from "@angular/forms";
import { ObjetoService } from '../../_services/objeto.service';
import {first} from "rxjs/operators";
import { Objeto } from '../../_interfaces/objeto.interface';


@Component({
  selector: 'app-edit-objeto',
  templateUrl: './edit-objeto.component.html',
  styleUrls: ['./edit-objeto.component.scss']
})
export class EditObjetoComponent implements OnInit {

  editFormObj: FormGroup;

  constructor(private formBuilder: FormBuilder,private objetoService: ObjetoService,private router: Router) { }

  ngOnInit() {
 

    this.editFormObj = this.formBuilder.group({
      idObjeto: [],
      nombre:           ['', Validators.required],
      descripcion:      ['', Validators.required],
      serie:            ['', Validators.required],
      fecAlta:          ['', Validators.required],
      fecActualizacion: ['', Validators.required],
      status:           ['', Validators.required],
});

let objId = localStorage.getItem("objId");
  if(!objId) {
    alert("Invalid action.")
    this.router.navigate(['objeto']);
     return;
    }


    this.objetoService.getObjById(+objId).subscribe(data =>{

      console.log(data)
      this.editFormObj.setValue(<Objeto>data["lista"]);
    })

  }


  onSubmit() {
    this.objetoService.updateObj(<Objeto>this.editFormObj.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['objeto']);
        },
        error => {
          alert(error);
        });
  }

  cancel(){
    this.router.navigate(['objeto']);
  }
}
