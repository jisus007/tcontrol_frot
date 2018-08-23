import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators} from "@angular/forms";
import { ParametroService } from '../../_services/parametro.service';
import { first} from "rxjs/operators";
import { Parametro } from '../../_interfaces/parametro.interface';
import { MatDialogRef, MatDialog } from '../../../../node_modules/@angular/material';
import { DialogComponent } from '../../dialog/dialog.component';

@Component({
  selector: 'app-edit-parametro',
  templateUrl: './edit-parametro.component.html',
  styleUrls: ['./edit-parametro.component.scss']
})
export class EditParametroComponent implements OnInit {

  formEditParametro: FormGroup;
  submitted: boolean = false;
  form: boolean = true;

  dialogRef: MatDialogRef<DialogComponent>;

  status: string[] = ['A', 'B'];
  constructor(public dialog: MatDialog,private formBuilder: FormBuilder,private parametroService: ParametroService,private router: Router ) { }
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

  get f() { return this.formEditParametro.controls; }


  onSubmit() {

    if (this.formEditParametro.invalid) {
      return;
  }

  this.dialogRef = this.dialog.open(DialogComponent, {
    disableClose: false
  });

  this.dialogRef.componentInstance.confirmMessage = "¿Desea realizar la actualización?"

  this.dialogRef.componentInstance.title = "Confirmar acción";

  this.dialogRef.afterClosed().subscribe(result => {
    if(result) {
    this.parametroService.updateParametro(<Parametro>this.formEditParametro.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['list-parametro']);
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
    this.router.navigate(['list-parametro']);
  }
}
