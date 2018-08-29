import { Component, OnInit } from '@angular/core';
import { Router } from '../../node_modules/@angular/router';

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
    //alert("init")
    console.log("onInit")
    //localStorage.removeItem("loged");
    let loged = localStorage.getItem("loged");
    let perfil = localStorage.getItem("perfil");

    console.log(loged)
    
    this.isLoged = loged;
    if(loged == "true"){
      console.log("loged")
     this.perfil = perfil;
      this.loged=true;
    }

  
  }

  logout(){
    this.loged=false;
    localStorage.removeItem("loged");
    localStorage.removeItem("perfil");

    this.router.navigate(['login']);
  }

  checkValue(): void {
    let loged = localStorage.getItem("loged");
    if(loged == "true"){
      console.log("loged in checkValue")
      this.logedAux=true;
      this.loged=true;
    }
  }


}
