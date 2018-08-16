import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators} from "@angular/forms";
import { ParametroService } from '../../_services/parametro.service';
import { first} from "rxjs/operators";
import { Parametro } from '../../_interfaces/parametro.interface';

@Component({
  selector: 'app-edit-parametro',
  templateUrl: './edit-parametro.component.html',
  styleUrls: ['./edit-parametro.component.scss']
})
export class EditParametroComponent implements OnInit {

  formEditParametro: FormGroup;
  submitted: boolean = false;
  form: boolean = true;


  constructor(private formBuilder: FormBuilder,private parametroService: ParametroService,private router: Router ) { }
  Id : String
  ngOnInit() {
    this.formEditParametro = this.formBuilder.group({
      idParametro:                 [],
      codigo:                     ['',Validators.required],
      valor:                      ['',Validators.required],
      status:                     ['',Validators.required],
      fecActualizacion:           ['',Validators.required],
     

      });

      this.Id = localStorage.getItem("Id");
      if(!this.Id) {
        alert("Invalid action.")
        this.router.navigate(['list-parametro']);
         return;
        }
        console.log("recuperando id")
        console.log("id"+this.Id);
        this.parametroService.getParametroById(this.Id).subscribe(data =>{
    
          console.log(data)
          this.formEditParametro.setValue(<Parametro>data["lista"]);
        })
  }

  
  onSubmit() {
    this.parametroService.updateParametro(<Parametro>this.formEditParametro.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['list-parametro']);
        },
        error => {
          alert(error);
        });
  }

  cancel(){
    this.router.navigate(['list-parametro']);
  }
}
