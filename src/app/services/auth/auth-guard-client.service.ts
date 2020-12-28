import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';      
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardClientService implements CanActivate {

  constructor(private router: Router) { }      
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {   
   console.log('running AuthGuardPartenaireService...')   
   
     if (this.isLoggedInClient()) {      
        return true;      
     }      
     // navigate to login page as user is not authenticated      
    this.router.navigate(['/sign-in']);      
    return false;      
}      
public isLoggedInClient(): boolean {      
  let status = false;      
  if (sessionStorage.getItem('isLoggedInClient') == "true") {      
     status = true;      
  }    
  else {      
     status = false;      
     }      
  return status;      
  }
}
