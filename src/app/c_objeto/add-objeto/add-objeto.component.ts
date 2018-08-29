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

  private tipos : Tipo[];

  private grupos : Grupo[];

  constructor(private formBuilder: FormBuilder,private objetoService: ObjetoService,private router: Router, private tipoService: TipoService,  private grupoService: GrupoService) { }


  //obj: Objeto = {nombre: '', descripcion: 0, serie: 0,fecAlta: '14/08/2018'};

  
  
  ngOnInit() {
    let loged = localStorage.getItem("loged");

    if(loged==null){
      this.router.navigate(['login']);
    }
    this.obtenerTipos();

    this.obtenerGrupos();

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

    
    console.log(this.tipos);
    this.tipos;
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
    console.log(this.formAddObjeto.value);
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
}
