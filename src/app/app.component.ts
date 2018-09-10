import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  
})
export class AppComponent implements OnInit{
  title = 'Raestreo';
  
  loged  : boolean = false;
  logedAux  : boolean = false;
  isLoged : String;
  perfil : String;
  constructor(private router: Router) { }
  ngOnInit() {

    this.verificaSesion();
  
  }

  logout(){
    this.loged=false;
    localStorage.removeItem("perfil");
    localStorage.removeItem("loged");

    this.router.navigate(['login']);
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
