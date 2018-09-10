import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators} from "@angular/forms";
import { UsuarioService } from '../../_services/usuario.service';
import {first} from "rxjs/operators";
import { Usuario } from '../../_interfaces/usuario.interface';
import { DatePipe } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MatDialog,MatDialogRef } from '@angular/material';
import { DialogComponent } from '../../dialog/dialog.component';

@Component({
  selector: 'app-edit-usuario',
  templateUrl: './edit-usuario.component.html',
  styleUrls: ['./edit-usuario.component.scss']
})
export class EditUsuarioComponent implements OnInit {

  dialogRef: MatDialogRef<DialogComponent>;
  editFormUser: FormGroup;
  usuario: Usuario
  imagePath: SafeResourceUrl;
  nombreUser: String;
  perfilUser: String;
  imageOn : boolean = false;
  breakpoint: number;
  constructor(public dialog: MatDialog,private formBuilder: FormBuilder, private usuarioService : UsuarioService,
    private router: Router,private datePipe: DatePipe,private _sanitizer: DomSanitizer) { }

  options: string[] = ['Administrador', 'Localizador', 'Usuario'];

  status: string[] = ['A', 'B'];

  tipo: string[] = ['A', 'B','C','D'];


  base64textString : String;

  ngOnInit() {


    this.validateSesion();

    this.validateFom();

    this.breakpoint = (window.innerWidth <= 750) ? 1 : 2;

    this.imageOn = false;

    let userId = localStorage.getItem("userId");
    if(!userId) {
    alert("Invalid action.")
    this.router.navigate(['objeto']);
     return;
    }


    this.usuarioService.getUserById(+userId).subscribe(data =>{


      this.editFormUser.setValue(<Usuario>data["lista"]);

      if(this.editFormUser.value.foto!=null){
        this.imageOn = true;
        this.imagePath = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' 
        + this.editFormUser.value.foto)
      }
             
      this.nombreUser = this.editFormUser.value.nombre;

      this.perfilUser = this.editFormUser.value.perfil;
      
    })

   


  }
  get f() { return this.editFormUser.controls; }

  onSubmit() {


  if (this.editFormUser.invalid) {
      return;
  }
    this.dialogRef = this.dialog.open(DialogComponent, {
      disableClose: false
    });

    this.dialogRef.componentInstance.confirmMessage = "¿Desea realizar la actualización?"

    this.dialogRef.componentInstance.title = "Confirmar acción";

    this.dialogRef.afterClosed().subscribe(result => {
      if(result) {

        if(this.base64textString!=undefined){
        
          this.editFormUser.value.foto = this.base64textString;
        }
        this.usuarioService.updateUser(<Usuario>this.editFormUser.value)
          .pipe(first())
          .subscribe(
            data => {
              this.router.navigate(['app/list-usuario']);
            },
            error => {
              alert(error);
            });
      }else{
        this.dialogRef = null;
      }
      this.dialogRef = null;
    });
   
  }

  cancel(){
    this.router.navigate(['app/list-usuario']);
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


  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 750) ? 1 : 2;
  }


  validateFom(){
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
      foto:               [''],
      estatus:            ['',Validators.required],
      password:           ['',Validators.required],
      perfil:             ['',Validators.required],
  });

  }


  validateSesion(){
    let loged = localStorage.getItem("loged");

    if(loged==null){
      this.router.navigate(['login']);
    }
  }
}
