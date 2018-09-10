import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from '../../../node_modules/rxjs';
import { Router } from '../../../node_modules/@angular/router';
import { Usuario } from '../_interfaces/usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {


   public API = 'https://access-token-web.herokuapp.com';

   constructor(private http:HttpClient,private router: Router) { }

   public getToken() {

    return this.http.get(this.API + '/generate/token').subscribe((data:any[])=> {
      localStorage.setItem("token", data["token"]);
     },
    );
    // return token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJ2ZWN0b3IifQ.brgmvWDZMsLg6IECJJ0xKf2-HBxTSxQNkHudpD6SseKnfJfVPrz3y-9lp1l8nRw0MEJQ9v5yZQarL65njSGqxNlPVrJG3JTpxHwlF77VfvulyonAIbOzCP3zAGPl7VafVtYPwmGB8AWUVxkn-8FFd0IymdopYLROJiBFQOp3LW5NNN68fFw1I1DSQHNvfsggFELKCZ5z-VHdorAD0fOkFJ6taprUX8i-phCJt2geiKkfRjA_nnwFdKxvpEIEgcQcmf9ZHyzDN5LCZicyFE9HzGUtff1tsIWf5QLrrfHswY6Sp6DOaZz_AykqeYRDQkCk4giZCsxU8EEtCfjXuE5OaA"
  }

  private loggedIn = new BehaviorSubject<boolean>(false); 

  get isLoggedIn() {
    return this.loggedIn.asObservable(); 
  }



  login(){
      this.loggedIn.next(true);
      this.router.navigate(['/']);

  }

  logout() {                           
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  
  }


}


