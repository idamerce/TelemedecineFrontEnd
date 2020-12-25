import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { User } from '../../models/User';
import { Observable } from 'rxjs';
import { URL } from '../../models/URL';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpClient : HttpClient) { }

  url:string=URL+"/api/admin/users";


  getAll():Observable<User[]>{
  		return this.httpClient.get<User[]>(this.url+"/getAll");  
  }

  update(user:User):Observable<User>{
  		return this.httpClient.put<User>(this.url+"/update/"+user.idUser,user);  
  }



  getNonActivatedAccounts():Observable<User[]>{
  		return this.httpClient.get<User[]>(this.url+"/getNonActivatedAccounts");  
  }

  getActivatedAccounts():Observable<User[]>{
  		return this.httpClient.get<User[]>(this.url+"/getActivatedAccounts");  
  }


   activateUser(id){
  		return this.httpClient.get(this.url+"/activateUser/"+id); //TODO verefier url
  }
   disactivateUser(id){
  		return this.httpClient.get(this.url+"/disactivateUser/"+id);  
  }



  getUserById(id):Observable<User> {
		  	return this.httpClient.get<User>(this.url+"/details/"+id);
  }

  deleteUser(id){
		return this.httpClient.delete(this.url+"/delete/"+id);
  }


 





}
