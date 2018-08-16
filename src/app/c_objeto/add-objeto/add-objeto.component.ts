import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators} from "@angular/forms";
import { ObjetoService } from '../../_services/objeto.service';
import {first} from "rxjs/operators";
import { Objeto } from '../../_interfaces/objeto.interface';

@Component({
  selector: 'app-add-objeto',
  templateUrl: './add-objeto.component.html',
  styleUrls: ['./add-objeto.component.scss']
})
export class AddObjetoComponent implements OnInit {

  formAddObjeto: FormGroup;
  submitted: boolean = false;
  form: boolean = true;


  constructor(private formBuilder: FormBuilder,private objetoService: ObjetoService,private router: Router) { }


  //obj: Objeto = {nombre: '', descripcion: 0, serie: 0,fecAlta: '14/08/2018'};

  
  ngOnInit() {
    this.formAddObjeto = this.formBuilder.group({
           idObjeto: [],
           nombre:           ['', Validators.required],
           descripcion:      ['', Validators.required],
           serie:            ['', Validators.required],
           fecAlta:          ['', Validators.required],
           fecActualizacion: ['', Validators.required],
           status:           ['', Validators.required],
    });
  }

  //metodo para ir a ventana de agregar objeto
  cancel(): void {
    this.router.navigate(['objeto']);
  };

  clean(): void {
    this.router.navigate(['objeto']);
  };


  onSubmit() {
    console.log(this.formAddObjeto.value);
    this.objetoService.createObjeto(<Objeto>this.formAddObjeto.value)
      .subscribe( data => {
        this.router.navigate(['objeto']);
      });
    }
}
