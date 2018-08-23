import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators} from "@angular/forms";
import { ObjetoService } from '../../_services/objeto.service';
import {first} from "rxjs/operators";
import { Objeto } from '../../_interfaces/objeto.interface';
import { Tipo } from '../../_interfaces/tipo.interface';
import { TipoService } from '../../_services/tipo.service';

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

  private tipos : Tipo[] = [];

  constructor(private formBuilder: FormBuilder,private objetoService: ObjetoService,private router: Router, private tipoService: TipoService) { }


  //obj: Objeto = {nombre: '', descripcion: 0, serie: 0,fecAlta: '14/08/2018'};

  
  
  ngOnInit() {

    this.tipos = this.obtenerTipos();
    this.formAddObjeto = this.formBuilder.group({
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

    
    console.log(this.tipos);
    this.tipos;
  }

  //metodo para ir a ventana de agregar objeto
  cancel(): void {
    this.router.navigate(['objeto']);
  };

  clean(): void {
    this.router.navigate(['objeto']);
  };


  onSubmit() {

    if (this.formAddObjeto.invalid) {
      return;
  }
    console.log(this.formAddObjeto.value);
    this.formAddObjeto.value.foto = this.base64textString;
    this.objetoService.createObjeto(<Objeto>this.formAddObjeto.value)
      .subscribe( data => {
        this.router.navigate(['objeto']);
      });
    }


 obtenerTipos(){
    this.tipos;
     let tipos2 : Tipo[] = [];

      this.tipoService.obtenerTodo()
      .subscribe((res : Tipo[]) => {
        tipos2 = res["lista"];
        console.log(res["lista"])

        console.log(this.tipos);

        return this.tipos
      })

      console.log(tipos2);
      return tipos2
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
