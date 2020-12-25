import {Role} from "./Role";

export class User {
	idUser:number;
	nomUser:string ;
	adresse:string ;
	tel:string ;
	email:string ;
	userName:string ;
	//password:string ;
	activated:boolean;
	roles :Role[] ;

/*
	toString():string{
		return this.nomUser+" "+this.email+" "+this.userName+" "+this.adresse+" "+this.tel;
	}
*/
}