import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardPartenaireService implements CanActivate {
  constructor(private router: Router) { }      
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {   

   console.log('running AuthGuardPartenaireService...',sessionStorage,this.isLoggedInPartenaire());   
     if (this.isLoggedInPartenaire()) {      
        return true;      
     }      
     // navigate to login page as user is not authenticated      
    this.router.navigate(['/sign-in']);      
    return false;      
}      
public isLoggedInPartenaire(): boolean {   
   
   return sessionStorage.getItem('isLoggedInPartenaire') == "true";
   


/*    let status = false;      
  if (sessionStorage.getItem('isLoggedInPatenaire') == "true") {      
     status = true;      
  }    
  else {      
     status = false;      
     }  
console.log('isLoggedInPatenaire :',status);    
  return status;    */   
  } 
}
