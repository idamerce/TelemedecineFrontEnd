import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { RegisterRequest } from '../../models/RegisterRequest';
import { LoginRequest } from '../../models/LoginRequest';
import { JwtAuthResponse } from '../../models/JwtAuthResponse';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LocalStorageService } from 'ngx-webstorage';
import {URL} from '../../models/URL';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient : HttpClient,private localStorageService:LocalStorageService) { }

  url:string=URL+"/api/auth";

  register(registerRequest:RegisterRequest):Observable<any>{
  	return this.httpClient.post(this.url+"/signup",registerRequest);
  }

  login(loginRequest:LoginRequest):Observable<boolean>{
  	return this.httpClient.post<JwtAuthResponse>(this.url+"/login",loginRequest).pipe(map(data=>{
  			this.localStorageService.store("authenticationToken",data.authenticationToken);
  			this.localStorageService.store("username",data.username);
  			this.localStorageService.store("user",data.user);
  			return true;
  	}));
  }

  isAuthenticated():boolean{
  	return this.localStorageService.retrieve("username")!=null;
  }

  logout(){
  	this.localStorageService.clear("authenticationToken");
  	this.localStorageService.clear("username");
  	this.localStorageService.clear("user");
  } 

}
