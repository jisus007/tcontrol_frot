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


  constructor(private formBuilder: FormBuilder,private parametroService: ParametroService,private router: Router ) { }

  ngOnInit() {
    this.formAddParametro = this.formBuilder.group({
      idParametro:                 [],
      codigo:             ['',Validators.required],
      valor:             ['',Validators.required],
      status:             ['',Validators.required],
      fecActualizacion:             ['',Validators.required],
     

      });
  }

  cancel(): void {
    this.router.navigate(['list-parametro']);
  };

  clean(): void {
    this.router.navigate(['list-parametro']);
  };


  onSubmit() {
    console.log(this.formAddParametro.value);
    this.parametroService.createParametro(<Parametro>this.formAddParametro.value)
      .subscribe( data => {
        this.router.navigate(['list-parametro']);
      });
    }


}
