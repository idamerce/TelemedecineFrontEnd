import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { MessageService }  from "../../services/message.service";
import { Subscription } from 'rxjs';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

 // getMessage:Subscription;


 //  constructor(private authService:AuthService, 
 //    private messageService:MessageService
 //    ) {
 //      this.getMessage = this.messageService.getMessage().subscribe(()=>{
 //          something to do
 //      });
 //  }

 //  isAuthenticated:boolean=false;
     ngOnInit(): void {
 //    this.isAuthenticated=this.authService.isAuthenticated();
     }

 
 //  logout(){
 //  	this.authService.logout();
 //    this.messageService.setMessage("logout success");
 //    this.orders=null;
 //  }

 
  
}
