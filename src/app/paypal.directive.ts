import { Directive,ElementRef,OnInit,Renderer2 } from '@angular/core';

@Directive({
  selector: '[appPaypal]'
})
export class PaypalDirective {

 public static price:number;
  constructor(private elementRef :ElementRef,private renderer :Renderer2) { }

	ngOnInit(){
		// console.log(this.elementRef);
		// 	(<any>window).paypal.Buttons({
		// 	       createOrder:(data,actions)=>{
		// 	         return actions.order.create({
		// 	           purchase_units:[{
		// 	             amount:{
		// 	               value: PaypalDirective.price,
		// 	               currencyCode :'USD'
		// 	             }
		// 	           }]
		// 	         })
		// 	       },
		// 	       onApprouve:(data,actions)=>{
		// 	         return actions.order.capture().then(details=>{
		// 	            // alert('transaction done');
		// 	              console.log('transaction done'+details); 
		// 	         })
		// 	       },
		// 	       onError:err=>{
		// 	             console.log(err)
		// 	       },
		// }).render(this.elementRef.nativeElement);
	}

 
}
