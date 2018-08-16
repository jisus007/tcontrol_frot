import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators} from "@angular/forms";
import { UsuarioService } from '../../_services/usuario.service';
import {first} from "rxjs/operators";
import { Usuario } from '../../_interfaces/usuario.interface';

@Component({
  selector: 'app-add-usuario',
  templateUrl: './add-usuario.component.html',
  styleUrls: ['./add-usuario.component.scss']
})
export class AddUsuarioComponent implements OnInit {

  formAddUsuario: FormGroup;
  submitted: boolean = false;
  form: boolean = true;

  constructor(private formBuilder: FormBuilder,private usuarioService: UsuarioService,private router: Router) { }

  ngOnInit() {
    this.formAddUsuario = this.formBuilder.group({
      idUsuario:          [],
      nombre:             ['',Validators.required],
      fecha:              ['',Validators.required],
      curp:               ['',Validators.required],
      rfc:                ['',Validators.required],
      numeroLic:          ['',Validators.required],
      tipoLic:            ['',Validators.required],
      vigencia:           ['',Validators.required],
      correo:             ['',Validators.required],
      foto:               ['',Validators.required],
      estatus:            ['',Validators.required],
      password:           ['',Validators.required],
      perfil:             ['',Validators.required],
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
    console.log(this.formAddUsuario.value);
    this.usuarioService.createUser(<Usuario>this.formAddUsuario.value)
      .subscribe( data => {
        this.router.navigate(['list-usuario']);
      });
    }
}
