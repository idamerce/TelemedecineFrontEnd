import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { FormGroup,FormBuilder ,FormControl, Validators} from '@angular/forms';
import { JwtClientService } from '../../services/auth/jwt-client.service';
import { AuthService } from '../../services/auth/auth.service';
import { AuthRequest } from '../../models/auth-request';
import { RegisterRequest } from '../../models/RegisterRequest';
import { LoginRequest } from '../../models/LoginRequest';
 import { MessageService }  from "../../services/message.service";
import { TokenStorageService } from 'src/app/services/auth/token-storage.service';
import { emailValidator } from './utils/app-validators';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  loginForm: FormGroup;
  registerForm: FormGroup;
  isLoggedIn = false;
  isLoginFailed = false;
  isProcessing = false;
  public passwordLoginHide:boolean = true;
  public passwordSignupHide:boolean = true;
  errorMessage = 'Identifiant ou mot de passe incorrect!';
  roles: string[] = [];
  role: string;
  view: string;
  constructor(public formBuilder: FormBuilder, public router:Router,
     private authService: AuthService, 
     private tokenStorage: TokenStorageService,private activatedRoute:ActivatedRoute) { }

  ngOnInit() {
    
 this.activatedRoute.paramMap.subscribe(params => {
  this.view = params.get('view');
  //console.log("-> from observable : "+this.view);   
  });
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
    sessionStorage.setItem('isLoggedInPatieent',"false");
    sessionStorage.setItem('isLoggedInAdmin',"false");
    sessionStorage.setItem('isLoggedMedecin',"false");
    this.loginForm = this.formBuilder.group({
      'login': ['', Validators.compose([Validators.required, emailValidator])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(6)])] 
    });

    this.registerForm = this.formBuilder.group({
      'nom': ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      'prenom': ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      'ville': ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      'login': ['', Validators.compose([Validators.required, emailValidator])],
      'sexe': ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      'adresse': ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      'cni': ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      //'phoneNumber': ['',[Validators.required,Validators.pattern(/[0-9]{9,9}/)]],
      'password': ['', Validators.required],
     'confirmPassword': ['', Validators.required]
    }
   // ,{validator: matchingPasswords('password', 'confirmPassword')}
    );

  }
  response:any;
  public onLoginFormSubmit() {
    console.log(this.loginForm.value);
    this.authService.login(this.loginForm.value.login, this.loginForm.value.password).subscribe(
      data => {

        console.log('actual user:',data);

        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);
        this.roles = this.tokenStorage.getUser().roles;
        console.log(data);
        this.isLoginFailed = false;
        // 
        this.isLoggedIn = true;
        sessionStorage.setItem('role',data.roles[0].name);
        
        switch (data.roles[0].name) {
          case "CLIENT_ROLE":
            sessionStorage.setItem('isLoggedInClient',"true");

            //On doit emettre la valeur provenant du local storage pour eviter les bugs au démarrage de l'App
            this.authService.userObservable.next(sessionStorage.getItem('isLoggedInClient'));

         //   this.appService.clientObservable.next('isLoggedInClient');
        //    window.location.reload();
            this.router.navigate(['/']);
            break;
          case "LIVREUR_ROLE":
            sessionStorage.setItem('isLoggedInAdmin',"true");
            this.router.navigate(['/']);
              break;
          default:
            sessionStorage.setItem('isLoggedInPartenaire',"true");
            this.router.navigate(['/'])
            break;
        }
        
      },
      err => {
         //  window.location.reload();
        //  this.snackBar.open('Identifiant ou mot de pasincorrect!', '×', { panelClass: 'danger', verticalPosition: 'top', duration: 3000 });

        //this.errorMessage = err.error.message;
        console.log(err);
        this.isLoginFailed = true;
      }
    );
  }

  public onRegisterFormSubmit(){
   
    this.isProcessing= true;
    console.log('Signing up :',this.registerForm.value)

    this.authService.register(this.registerForm.value.login,this.registerForm.value.nom,
      this.registerForm.value.prenom,
      this.registerForm.value.cni,
      this.registerForm.value.ville,
      this.registerForm.value.adresse,
      this.registerForm.value.sexe,
      this.registerForm.value.password
      ).subscribe(
      data => {
        this.isProcessing= !this.isProcessing;

        console.log('registered user :', data);
       // this.snackBar.open('Vous vous êtes inscrit avec succès!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
        this.loginForm.value.email = this.registerForm.value.email;
        this.loginForm.value.password = this.registerForm.value.password;

        this.onLoginFormSubmit();
      },
      err => {

        this.isProcessing= !this.isProcessing;

        console.log('Erreur :',err);
        if(err.error.message == "Error: phone number is already in use!")
        {
          this.errorMessage = "Le numéro de téléphone est déjà utilisé!";
        }
        else{
          this.errorMessage = "L'adresse mail est déjà utilisée!";
        }
       // this.snackBar.open(this.errorMessage, '×', { panelClass: 'danger', verticalPosition: 'top', duration: 3000 });
      }
    );
  }
}
