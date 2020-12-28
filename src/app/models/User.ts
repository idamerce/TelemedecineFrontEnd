import {Role} from "./Role";

export class User {
	id:number;
	nom:string ;
	prenom:string ;
	sexe:string ;
	adresse:string ;
	ville:string;
	login:string ;
 	activated:boolean ;
	roles :Role[] ;

 
}