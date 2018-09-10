import { Injectable } from '@angular/core';
import {AuthServiceService} from './_services/auth-service.service';
import {
  HttpEvent, 
  HttpInterceptor, 
  HttpHandler, 
  HttpRequest,
  HttpResponse,
	HttpHeaders
} from '@angular/common/http'
import { Observable } from 'rxjs';
import { catchError,tap} from 'rxjs/operators';
const apiToken = "http://localhost:8085/generate/token";
@Injectable()


export class CustomHttpInterceptor  implements HttpInterceptor {

	constructor(private authService: AuthServiceService) { }

  	intercept(request: HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>> {

			if(request.url!=apiToken){

					const authReq = request.clone({
					 							setHeaders: {
												 Authorization: `Bearer ${localStorage.getItem("token")}`,
						},
           			 });
			  return next.handle(authReq);
			}
  } 
}