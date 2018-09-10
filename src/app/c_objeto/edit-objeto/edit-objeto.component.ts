import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators} from "@angular/forms";
import { ObjetoService } from '../../_services/objeto.service';
import {first} from "rxjs/operators";
import { Objeto } from '../../_interfaces/objeto.interface';
import { Tipo } from '../../_interfaces/tipo.interface';
import { TipoService } from '../../_services/tipo.service';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { MatDialogRef, MatDialog } from '@angular/material';
import { DialogComponent } from '../../dialog/dialog.component';
import { Grupo } from '../../_interfaces/grupo.interface';
import { GrupoService } from '../../_services/grupo.service';


@Component({
  selector: 'app-edit-objeto',
  templateUrl: './edit-objeto.component.html',
  styleUrls: ['./edit-objeto.component.scss']
})
export class EditObjetoComponent implements OnInit {

  dialogRef: MatDialogRef<DialogComponent>;
  editFormObj: FormGroup;
  nombreObjeto: String;
  base64textString : String;
  tipo : Tipo;
  imageOn : boolean = false;
  status: string[] = ['A', 'B'];
  imagePath: SafeResourceUrl;
  public tipos : Tipo[];



  breakpoint: number;

  public grupos : Grupo[];
  constructor(public dialog: MatDialog,
              private formBuilder: FormBuilder,
              private objetoService: ObjetoService,
              private router: Router,
              private tipoService: TipoService,
              private _sanitizer: DomSanitizer, 
              private grupoService: GrupoService) { }

  ngOnInit() {


    this.breakpoint = (window.innerWidth <= 750) ? 1 : 2;

    this.validateSesion();

    //inicializamos formulario
    this.validateForm();

    //obtenemos los tipos para combo tipos
    this.obtenerTipos();

    //obtenemos los grupos para combo grupos
    this.obtenerGrupos();

    

      let objId = localStorage.getItem("objId");
      if(!objId) {
      //si no hay id regremos a la lista de objetos
       this.router.navigate(['app/objeto']);
        return;
      }

    
      this.objetoService.getObjById(+objId).subscribe(data =>{
      this.editFormObj.setValue(<Objeto>data["lista"]);

      if(this.editFormObj.value.foto!=null){
      //activamos bandera de image
      this.imageOn = true;
      
      this.imagePath = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' 
      + this.editFormObj.value.foto)
      }


      this.nombreObjeto = this.editFormObj.value.nombre;
    })


    


    this.obtenerTipos();
    

  }

  //metodo para obtener los tipos
  obtenerTipos(){
    this.tipoService.obtenerTodo()
    .subscribe((res : Tipo[]) => {
     this.tipos = res["lista"];
      return this.tipos
    })
}

//metodo para obtener grupos
  obtenerGrupos(){
    this.grupoService.obtenerTodo()
    .subscribe((res : Grupo[]) => {
    this.grupos = res["lista"];
       return this.grupos
    })
  }
  //metodo para lanzar peticion para actualizar.
  onSubmit() {
    if (this.editFormObj.invalid) {
      return;
  }

  this.dialogRef = this.dialog.open(DialogComponent, {
    disableClose: false
  });

  this.dialogRef.componentInstance.confirmMessage = "¿Desea realizar la actualización?"

  this.dialogRef.componentInstance.title = "Confirmar acción";

  this.dialogRef.afterClosed().subscribe(result => {
    if(result) {//confirmo la actualizacion
         if(this.base64textString!=undefined){
  
            this.editFormObj.value.foto = this.base64textString;
        }else{
            console.log("no se modifico imagen");
            console.log(this.editFormObj.value.foto);
        }
          this.objetoService.updateObj(<Objeto>this.editFormObj.value)
          .pipe(first())
          .subscribe(
          data => {
          this.router.navigate(['app/objeto']);
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
    this.router.navigate(['app/objeto']);
  }


  handleFileSelect(evt){//atrapamos el evento cuando se carga la imagen
    var files = evt.target.files;
    var file = files[0];

  if (files && file) {
      var reader = new FileReader();
      reader.onload =this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
  }
}


//metodo para leer el archivo
_handleReaderLoaded(readerEvt) {
   var binaryString = readerEvt.target.result;
          this.base64textString= btoa(binaryString);
          console.log(this.base64textString);
          alert("imagen cargada")
  }

  //metodo para aplicar responsividad 
  onResize(event) {

    this.breakpoint = (event.target.innerWidth <= 750) ? 1 : 2;

  }

  validateForm(){
    this.editFormObj = this.formBuilder.group({ //metodo para validar formulario
      idObjeto: [],
      nombre:           ['', Validators.required],
      descripcion:      ['', Validators.required],
      serie:            ['', Validators.required],
      fecAlta:          ['', Validators.required],
      fecActualizacion: ['', Validators.required],
      status:           ['', Validators.required],
      placas:           ['', Validators.required],
      tipo:             ['', Validators.required],
      grupo:            ['', Validators.required],
      foto:             [''],
  });
  }

  validateSesion(){
    let loged = localStorage.getItem("loged");

    if(loged==null){
      this.router.navigate(['login']);
    }
  }
}
