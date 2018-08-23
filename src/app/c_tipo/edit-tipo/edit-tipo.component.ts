import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators} from "@angular/forms";
import { TipoService } from '../../_services/tipo.service';
import {first} from "rxjs/operators";
import { Tipo } from '../../_interfaces/tipo.interface';
import { DialogComponent } from '../../dialog/dialog.component';
import { MatDialog, MatDialogRef } from '../../../../node_modules/@angular/material';

@Component({
  selector: 'app-edit-tipo',
  templateUrl: './edit-tipo.component.html',
  styleUrls: ['./edit-tipo.component.scss']
})
export class EditTipoComponent implements OnInit {

  formEditTipo: FormGroup;
  submitted: boolean = false;
  form: boolean = true;
  dialogRef: MatDialogRef<DialogComponent>;

  constructor(public dialog: MatDialog,private formBuilder: FormBuilder,private tipoService: TipoService,private router: Router ) { }
  Id : String;
  ngOnInit() {
    this.formEditTipo = this.formBuilder.group({
      idTipo:                  ['',Validators.required],
      descripcion:             ['',Validators.required],

    });

    this.Id = localStorage.getItem("Id");
  if(!this.Id) {
    alert("Invalid action.")
    this.router.navigate(['list-tipo']);
     return;
    }
    console.log("recuperando id")
    console.log("id"+this.Id);
    this.tipoService.getTipoById(this.Id).subscribe(data =>{

      console.log(data)
      this.formEditTipo.setValue(<Tipo>data["lista"]);
    })
  }

  get f() { return this.formEditTipo.controls; }

  onSubmit() {

    if (this.formEditTipo.invalid) {
      return;
  }
  this.dialogRef = this.dialog.open(DialogComponent, {
    disableClose: false
  });

  this.dialogRef.componentInstance.confirmMessage = "¿Desea realizar la actualización?"

  this.dialogRef.componentInstance.title = "Confirmar acción";

  this.dialogRef.afterClosed().subscribe(result => {
    if(result) {
    this.tipoService.updateTipo(<Tipo>this.formEditTipo.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['list-tipo']);
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
    this.router.navigate(['list-tipo']);
  }

  



}
