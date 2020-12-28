import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

const AUTH_API = 'http://localhost:8080/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userObservable = new BehaviorSubject('');
  currentUserObservable = this.userObservable.asObservable();
  constructor(private http: HttpClient) { }

  login(email,password): Observable<any> {
    return this.http.post(AUTH_API + 'signin', {
      username: email,
      password: password
    }, httpOptions);
  }
  register(login,nom,prenom,cni,ville,adresse,sexe,password): Observable<any> {
    return this.http.post(AUTH_API + 'signup', {
      login: login,
      nom: nom,
      prenom: prenom,
      ville: ville,
      adresse: adresse,
      sexe: sexe,
      cni: cni,
      password: password
    }, httpOptions);
  }
}
