import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '../../../node_modules/@angular/router';
import {MatDialog} from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  returnUrl: string;
  username : string
  password : string
  dialogResult : string
  loged  : boolean

  constructor(private router : Router, private route: ActivatedRoute,public dialog: MatDialog) {
  }
  ngOnInit() {
    //this.loged = true;

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '';
  }

  
     login()  {
    if(this.username == 'admin' && this.password == 'admin'){
      console.log("activa bandera en true")
     //this.loged = true;
   //  this.router.navigate(["app",this.loged]);
       sessionStorage.setItem('user', this.username);
      console.log(this.returnUrl);
   this.router.navigate([this.returnUrl]);

     
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

