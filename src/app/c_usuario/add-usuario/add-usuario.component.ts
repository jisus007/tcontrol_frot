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
  usuario: Usuario

  fileToUpload: File = null;

  options: string[] = ['Administrador', 'Localizador', 'Usuario'];

  status: string[] = ['A', 'B'];

  tipo: string[] = ['A', 'B','C','D'];

  base64textString : String;

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
      foto:               [''],
      estatus:            ['',Validators.required],
      password:           ['',Validators.required],
      perfil:             ['',Validators.required],
});
  }

  get f() { return this.formAddUsuario.controls; }

  //metodo para ir a ventana de agregar objeto
  cancel(): void {
    this.router.navigate(['list-usuario']);
  };

  clean(): void {
    this.router.navigate(['objeto']);
  };


  onSubmit() {
    // stop here if form is invalid
    if (this.formAddUsuario.invalid) {
      return;
  }
    console.log(this.formAddUsuario.value);
    this.formAddUsuario.value.foto = this.base64textString;
    this.usuarioService.createUser(<Usuario>this.formAddUsuario.value)
      .subscribe( data => {
        this.router.navigate(['list-usuario']);
      });
    }

    handleFileSelect(evt){
      var files = evt.target.files;
      var file = files[0];

    if (files && file) {
        var reader = new FileReader();

        reader.onload =this._handleReaderLoaded.bind(this);

        reader.readAsBinaryString(file);
    }
  }



  _handleReaderLoaded(readerEvt) {
     var binaryString = readerEvt.target.result;
            this.base64textString= btoa(binaryString);
            console.log(this.base64textString);
            alert("imagen cargada")
    }
}
