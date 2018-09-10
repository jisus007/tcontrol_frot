import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators} from "@angular/forms";
import { ParametroService } from '../../_services/parametro.service';
import { first} from "rxjs/operators";
import { Parametro } from '../../_interfaces/parametro.interface';


@Component({
  selector: 'app-add-parametro',
  templateUrl: './add-parametro.component.html',
  styleUrls: ['./add-parametro.component.scss']
})
export class AddParametroComponent implements OnInit {

  formAddParametro: FormGroup;
  submitted: boolean = false;
  form: boolean = true;
  status: string[] = ['A', 'B'];

  constructor(private formBuilder: FormBuilder,private parametroService: ParametroService,private router: Router ) { }

  ngOnInit() {

    this.validateSesion();

    this.validateFom();

  }

  get f() { return this.formAddParametro.controls; }


  cancel(): void {
    this.router.navigate(['app/list-parametro']);
  };

  clean(): void {
    this.router.navigate(['app/list-parametro']);
  };


  onSubmit() {
    if (this.formAddParametro.invalid) {
      return;
  }
    console.log(this.formAddParametro.value);
    this.parametroService.createParametro(<Parametro>this.formAddParametro.value)
      .subscribe( data => {
        this.router.navigate(['app/list-parametro']);
      });
    }

    validateFom(){

      this.formAddParametro = this.formBuilder.group({
        idParametro:        [],
        codigo:             ['',Validators.required],
        valor:              ['',Validators.required],
        status:             ['',Validators.required],
        fecActualizacion:   ['',Validators.required],
        });
    
    }
  
  
    validateSesion(){
      let loged = localStorage.getItem("loged");
  
      if(loged==null){
        this.router.navigate(['login']);
      }
    }
}
