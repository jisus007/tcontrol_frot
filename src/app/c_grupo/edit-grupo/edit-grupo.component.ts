import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators} from "@angular/forms";
import { GrupoService } from '../../_services/grupo.service';
import {first} from "rxjs/operators";
import { Grupo } from '../../_interfaces/grupo.interface';
import { MatDialogRef, MatDialog } from '../../../../node_modules/@angular/material';
import { DialogComponent } from '../../dialog/dialog.component';


@Component({
  selector: 'app-edit-grupo',
  templateUrl: './edit-grupo.component.html',
  styleUrls: ['./edit-grupo.component.scss']
})
export class EditGrupoComponent implements OnInit {

  constructor(public dialog: MatDialog,private formBuilder: FormBuilder,private grupoService: GrupoService,private router: Router) { }
 
  dialogRef: MatDialogRef<DialogComponent>;
  formEditGrupo: FormGroup;
  submitted: boolean = false;
  form: boolean = true;

  Id : String;
  ngOnInit() {
    let loged = localStorage.getItem("loged");

    if(loged==null){
      this.router.navigate(['login']);
    }
    this.formEditGrupo = this.formBuilder.group({
      idGrupo:                 ['',Validators.required],
      descripcion:             ['',Validators.required],

   });
  

this.Id = localStorage.getItem("Id");
  if(!this.Id) {
    alert("Invalid action.")
    this.router.navigate(['app/list-grupo']);
     return;
    }
    console.log("recuperando id")
    console.log("id"+this.Id);
    this.grupoService.getGrupoById(this.Id).subscribe(data =>{

      console.log(data)
      this.formEditGrupo.setValue(<Grupo>data["lista"]);
    })


    
  }

  get f() { return this.formEditGrupo.controls; }

  onSubmit() {

    if (this.formEditGrupo.invalid) {
      return;
  }

  this.dialogRef = this.dialog.open(DialogComponent, {
    disableClose: false
  });

  this.dialogRef.componentInstance.confirmMessage = "¿Desea realizar la actualización?"

  this.dialogRef.componentInstance.title = "Confirmar acción";

  this.dialogRef.afterClosed().subscribe(result => {
    if(result) {
    this.grupoService.updateGrupo(<Grupo>this.formEditGrupo.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['app/list-grupo']);
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
    this.router.navigate(['app/list-grupo']);
  }
}
