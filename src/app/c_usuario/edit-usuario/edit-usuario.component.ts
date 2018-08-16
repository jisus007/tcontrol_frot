import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators} from "@angular/forms";
import { UsuarioService } from '../../_services/usuario.service';
import {first} from "rxjs/operators";
import { Usuario } from '../../_interfaces/usuario.interface';

@Component({
  selector: 'app-edit-usuario',
  templateUrl: './edit-usuario.component.html',
  styleUrls: ['./edit-usuario.component.scss']
})
export class EditUsuarioComponent implements OnInit {

  editFormUser: FormGroup;

  constructor(private formBuilder: FormBuilder, private usuarioService : UsuarioService,private router: Router) { }

  ngOnInit() {
    this.editFormUser = this.formBuilder.group({
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

let userId = localStorage.getItem("userId");
  if(!userId) {
    alert("Invalid action.")
    this.router.navigate(['objeto']);
     return;
    }


    this.usuarioService.getUserById(+userId).subscribe(data =>{

      console.log(data)
      this.editFormUser.setValue(<Usuario>data["lista"]);
    })



  }


  onSubmit() {
    this.usuarioService.updateUser(<Usuario>this.editFormUser.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['list-usuario']);
        },
        error => {
          alert(error);
        });
  }

  cancel(){
    this.router.navigate(['list-usuario']);
  }
}
