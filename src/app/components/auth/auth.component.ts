import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { FormGroup,FormBuilder ,FormControl} from '@angular/forms';
import { JwtClientService } from '../../services/auth/jwt-client.service';
import { AuthService } from '../../services/auth/auth.service';
import { AuthRequest } from '../../models/auth-request';
import { RegisterRequest } from '../../models/RegisterRequest';
import { LoginRequest } from '../../models/LoginRequest';
 import { MessageService }  from "../../services/message.service";


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(private activatedRoute:ActivatedRoute, 
    private formBuilder:FormBuilder,private messageService: MessageService,
    private router:Router,
    private authService:AuthService) {

    this.loginForm=new FormGroup({
          username: new FormControl(),
          password: new FormControl(),
     });
    this.loginRequest ={
      username:'',
      password:''
    };
   this.registerForm= this.formBuilder.group({
      username:'',
      password:'',
      email:'',
      confirmPassword:''
    });
   this.registerRequest ={
      username:'',
      password:'',
      email:'',
    };
  }

  
  authRequest:AuthRequest= new AuthRequest();

  response:any;

  view :string ='';
  ngOnInit(): void {
  	this.activatedRoute.paramMap.subscribe(params => {
      this.view = params.get('view');
  		console.log("-> from observable : "+this.view);   
    });
  }

  registerForm :FormGroup;
  loginForm :FormGroup;
  registerRequest:RegisterRequest;
  loginRequest:LoginRequest;

  register(){
   this.registerRequest.username= this.registerForm.get("username").value;
   this.registerRequest.email= this.registerForm.get("email").value;
   this.registerRequest.password= this.registerForm.get("password").value;
  

   if(this.registerRequest.password ==  this.registerForm.get("confirmPassword").value){
     this.authService.register(this.registerRequest).subscribe(
       res=> {
         console.log(res); 
           this.router.navigateByUrl('/home');
       },err=>console.log(err));
   }else{
     console.log("not matched password"); 
   }
  }


  login(){
    this.loginRequest.username=this.loginForm.get("username").value;
    this.loginRequest.password= this.loginForm.get("password").value;
    this.authService.login(this.loginRequest).subscribe(
       res=> {
         if(res) {
           this.router.navigateByUrl('/home');
           this.messageService.setMessage("connection success");
         } 
         else {console.log(res);}
       },
       err=>{
         console.log(err)
       });

  }
}
