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
      email: email,
      password: password
    }, httpOptions);
  }
  register(email,fullname,phone,photo,password): Observable<any> {
    return this.http.post(AUTH_API + 'signup', {
      email:email,
      fullname: fullname,
      phone: phone,
      photo: photo,
      password: password
    }, httpOptions);
  }
}
