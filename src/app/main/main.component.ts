import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Router } from '../../../node_modules/@angular/router';
import { LoginComponent } from '../login/login.component';
import { AuthServiceService } from '../_services/auth-service.service';
import { Observable } from '../../../node_modules/rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent  {

  
  loged  : boolean = false;
  logedAux  : boolean = false;
  isLoged : String;
  perfil : String;
  isLoggedIn$: Observable<boolean>; 
  
  constructor(private router: Router, private authService: AuthServiceService) { }
  ngOnInit() {

    this.isLoggedIn$ = this.authService.isLoggedIn; // {2}
    //this.verificaSesion();
    let perfil = localStorage.getItem("perfil");

    this.perfil = perfil;
  }

  logout(){
    this.loged=false;
    localStorage.removeItem("perfil");
    localStorage.removeItem("loged");

    this.router.navigate(['login']);
  }

  onLogout(){
    this.authService.logout();                     // {3}
  }

  checkValue(): void {
    let loged = localStorage.getItem("loged");
    if(loged == "true"){
      this.loged=true;
    }else{
      this.loged=false;
    }
  }

  verificaSesion(){
    let loged = localStorage.getItem("loged");
    let perfil = localStorage.getItem("perfil");

    this.loged = false;
    
    if(loged == "true"){
      this.perfil = perfil;
      this.loged=true;
    }else{
      this.loged=false;
    }
  }

}