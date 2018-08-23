import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators} from "@angular/forms";
import { ObjetoService } from '../../_services/objeto.service';
import {first} from "rxjs/operators";
import { Objeto } from '../../_interfaces/objeto.interface';
import { Tipo } from '../../_interfaces/tipo.interface';
import { TipoService } from '../../_services/tipo.service';
import { SafeResourceUrl, DomSanitizer } from '../../../../node_modules/@angular/platform-browser';
import { MatDialogRef, MatDialog } from '../../../../node_modules/@angular/material';
import { DialogComponent } from '../../dialog/dialog.component';


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
  constructor(public dialog: MatDialog,private formBuilder: FormBuilder,private objetoService: ObjetoService,private router: Router, private tipoService: TipoService,private _sanitizer: DomSanitizer) { }

  ngOnInit() {
 

    this.editFormObj = this.formBuilder.group({
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

let objId = localStorage.getItem("objId");
  if(!objId) {
    alert("Invalid action.")
    this.router.navigate(['objeto']);
     return;
    }

    
    this.objetoService.getObjById(+objId).subscribe(data =>{

      console.log(data)
      this.editFormObj.setValue(<Objeto>data["lista"]);
    if(this.editFormObj.value.foto!=null){
      console.log("cumple validacion");
      this.imageOn = true;
      this.imagePath = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' 
      + this.editFormObj.value.foto)
      }


      this.nombreObjeto = this.editFormObj.value.nombre;
    })


    


    this.obtenerTipos();
    

  }

  public obtenerTipos(){
    
    this.tipoService.obtenerTodo()
    .subscribe((data:Tipo[])=> {
      this.tipo = data["lista"];
    }
   );


   ///this.isloading = false;
}
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
    if(result) {
  if(this.base64textString!=undefined){
    console.log("se modifico la imagen");
    this.editFormObj.value.foto = this.base64textString;
  }else{
    console.log("no se modifico imagen");
    console.log(this.editFormObj.value.foto);
  }
    this.objetoService.updateObj(<Objeto>this.editFormObj.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['objeto']);
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
    this.router.navigate(['objeto']);
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
