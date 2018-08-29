import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '../../../node_modules/@angular/router';
import {MatDialog} from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UsuarioService } from '../_services/usuario.service';
import { Usuario } from '../_interfaces/usuario.interface';
import { FormGroup, FormBuilder, Validators } from '../../../node_modules/@angular/forms';
import { AlertComponent } from '../alert/alert.component';

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
  
  dialogRef: MatDialogRef<AlertComponent>;
  formLogin: FormGroup;
  constructor(private formBuilder: FormBuilder,private usuarioService: UsuarioService,private router : Router, private route: ActivatedRoute,public dialog: MatDialog) {
  }
  ngOnInit() {
              
    //this.dialogRef.componentInstance.title = "Informacion";
    localStorage.removeItem("loged");
    this.formLogin = this.formBuilder.group({
    
      username:             ['',Validators.required],
      password:              ['',Validators.required],
    });


  }

 



  

  
     login()  {
      if (this.formLogin.invalid) {
        return;
      }
      this.usuarioService.getUserByEmail(this.username).subscribe(
        (result: any) => { 
          localStorage.removeItem("loged");
          if(result["lista"]!=null){
            if(this.password == result["lista"].password){
              localStorage.setItem("email", result["lista"].correo.toString());
              localStorage.setItem("perfil", result["lista"].perfil.toString());
              localStorage.setItem("loged", "true");
              this.router.navigate(['app']);
            }else{
              this.dialogRef = this.dialog.open(AlertComponent, {
                disableClose: false
              });
                    
              this.dialogRef.componentInstance.title = "Notificación";
              this.dialogRef.componentInstance.confirmMessage = "Verifique la información"
          
  
            }
        }else{

          this.dialogRef = this.dialog.open(AlertComponent, {
            disableClose: false
          });
          
          this.dialogRef.componentInstance.title = "Notificación";
          this.dialogRef.componentInstance.confirmMessage = "El usuario no existe "


         // alert("Verifique la informacion");
        }
        },
        (error: any) => { 
          console.log('error', error);
          this.dialogRef = this.dialog.open(AlertComponent, {
            disableClose: false
          });
          
          this.dialogRef.componentInstance.title = "Notificación";
          this.dialogRef.componentInstance.confirmMessage = "El servicio no esta disponible "
        },
      )
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

