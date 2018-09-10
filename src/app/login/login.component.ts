import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {MatDialog} from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UsuarioService } from '../_services/usuario.service';
import { AuthServiceService } from '../_services/auth-service.service';
import { Usuario } from '../_interfaces/usuario.interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertComponent } from '../alert/alert.component';
import { sha256, sha224 } from 'js-sha256';
import { BehaviorSubject } from '../../../node_modules/rxjs';
import { Injectable } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

@Injectable()
export class LoginComponent implements OnInit{
  returnUrl: string;
  username : string
  password : string
  dialogResult : string
  loged  : boolean
  
  private loggedIn = new BehaviorSubject<boolean>(false); 
  
  dialogRef: MatDialogRef<AlertComponent>;
  formLogin: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private router : Router, 
    private route: ActivatedRoute,
    public dialog: MatDialog,
    public authService: AuthServiceService) {
  }
  ngOnInit() {

    localStorage.removeItem("loged");

    this.validateForm();          
    //this.dialogRef.componentInstance.title = "Informacion";
  }

  get isLoggedIn() {
    return this.loggedIn.asObservable(); // {2}
  }

 

     login()  {
      if (this.formLogin.invalid) {
        return;
      }
      
      //obtenemos el token y lo subimos a sesion
      this.authService.getToken();

     
      
      this.usuarioService.getUserByEmail(this.username).subscribe(
        (result: any) => { 
          localStorage.removeItem("loged");
          if(result["lista"]!=null){
            if(sha256(this.password) == result["lista"].password){
              localStorage.setItem("email", result["lista"].correo.toString());
              localStorage.setItem("perfil", result["lista"].perfil.toString());
              localStorage.setItem("loged", "true");
              //this.router.navigate(['app']);
              this.authService.login(); 
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

  validateForm(){
    this.formLogin = this.formBuilder.group({
    
      username:             ['',Validators.required],
      password:              ['',Validators.required],
    });

  }

  logout() {                          
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }


}

