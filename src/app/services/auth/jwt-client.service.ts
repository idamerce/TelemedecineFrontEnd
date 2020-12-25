import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class JwtClientService {

  constructor(private httpClient : HttpClient) { }


  url:string="http://localhost:8080";

  public generateToken(request){
  	return this.httpClient.post(this.url+"/authenticate",request,{responseType:'text' as 'json'});
  }

  public welcome(token){
  	let tokenStr='Bearer '+token ;
  	const headers= new HttpHeaders().set("Authorization",tokenStr);
  	return this.httpClient.get(this.url+"/",{headers, responseType:'text' as 'json'})
  }

  public getLoggedUser(token){
  	let tokenStr='Bearer '+token ;
  	const headers= new HttpHeaders().set("Authorization",tokenStr);
  	return this.httpClient.get(this.url+"/",{headers, responseType:'text' as 'json'})
  }
}
