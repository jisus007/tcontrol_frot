import { Component, OnInit } from '@angular/core';
import { Router } from '../../../node_modules/@angular/router';
import {MatDialog} from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  ngOnInit() {
    //this.loged = true;
  }
  constructor(private router : Router, public dialog: MatDialog) {
  }

  username : string
  password : string
  dialogResult : string
  loged  : boolean

  
     login()  {
    if(this.username == 'admin' && this.password == 'admin'){
     
      console.log("activa bandera en true")
     this.loged = true;

     this.router.navigate(["app"]);
    }else {
      alert("Usuario invalido");
      //this.openDialog();
      this.loged = false;
    }
  }


  openDialog() {
    let dialogRef = this.dialog.open(DialogComponent, {
      width: '600px',
      data: 'This text is passed into the dialog!'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog closed: ${result}`);
      this.dialogResult = result;
    });
}

}

