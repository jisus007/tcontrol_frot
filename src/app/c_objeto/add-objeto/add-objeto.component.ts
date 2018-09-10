import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators} from "@angular/forms";
import { ObjetoService } from '../../_services/objeto.service';
import {first, max} from "rxjs/operators";
import { Objeto } from '../../_interfaces/objeto.interface';
import { Tipo } from '../../_interfaces/tipo.interface';
import { TipoService } from '../../_services/tipo.service';
import { GrupoService } from '../../_services/grupo.service';
import { Grupo } from '../../_interfaces/grupo.interface';

@Component({
  selector: 'app-add-objeto',
  templateUrl: './add-objeto.component.html',
  styleUrls: ['./add-objeto.component.scss']
})
export class AddObjetoComponent implements OnInit {

  formAddObjeto: FormGroup;
  submitted: boolean = false;
  form: boolean = true;
  //tipos : Tipo;
  base64textString : String;

  status: string[] = ['A', 'B'];
  public data:Array<Tipo>=[];

  public tipos : Tipo[];

  public grupos : Grupo[];

  breakpoint: number;

  showDiv : boolean = false;

  constructor(private formBuilder: FormBuilder,private objetoService: ObjetoService,private router: Router, private tipoService: TipoService,  private grupoService: GrupoService) { }



  
  ngOnInit() {

    
    this.showDiv = false;

    //valida la sesion
    this.validateSesion();
    
    //valida form
    this.validateFom();

    this.obtenerTipos();

    this.obtenerGrupos();

  }

  //metodo para ir a ventana de agregar objeto
  cancel(): void {
    this.router.navigate(['app/objeto']);
  };

  clean(): void {
    this.router.navigate(['app/objeto']);
  };


  onSubmit() {

    if (this.formAddObjeto.invalid) {
        return;
    }
    
    this.formAddObjeto.value.foto = this.base64textString;
    this.objetoService.createObjeto(<Objeto>this.formAddObjeto.value)
      .subscribe( data => {
        this.router.navigate(['app/objeto']);
      });
    }


 obtenerTipos(){
      this.tipoService.obtenerTodo()
      .subscribe((res : Tipo[]) => {
       this.tipos = res["lista"];
        return this.tipos
      })
  }

  obtenerGrupos(){
    this.grupoService.obtenerTodo()
    .subscribe((res : Grupo[]) => {
     this.grupos = res["lista"];
      return this.grupos
    })
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

  validateFom(){

    this.formAddObjeto = this.formBuilder.group({
      idObjeto: [],
      nombre:           ['', Validators.required],
      descripcion:      ['', Validators.required],
      serie:            ['', Validators.required],
      fecAlta:          ['', Validators.required],
      fecActualizacion: ['', Validators.required],
      status:           ['', Validators.required],
      placas:           ['', Validators.required, Validators.maxLength(9), Validators.minLength(9)],
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

    //metodo para aplicar responsividad 
    onResize(event) {
    console.log("onResize")
      if(event.target.innerWidth <= 500){
          console.log("hablitando contenido");  
        this.showDiv = true;
      }else{
        this.showDiv = false;
      }
    }
    
}
