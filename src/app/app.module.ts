import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { AuthComponent } from './components/auth/auth.component';
import {FormsModule,ReactiveFormsModule} from '@angular/forms'
import { NgxWebstorageModule } from 'ngx-webstorage';
import { HomeComponent } from './components/home/home.component';

import { HttpClientInterceptor } from './services/auth/HttpClientInterceptor';
import { AuthGuard } from './auth.Guard';
import { PaypalDirective } from './paypal.directive';

import { ContactComponent } from './components/contact/contact.component';
import { AboutComponent } from './components/about/about.component';
import { ErrorComponent } from './components/error/error.component';



@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    AuthComponent,
    HomeComponent, 
    ContactComponent, AboutComponent, ErrorComponent,  
  ],
  imports: [
    BrowserModule,
    NgxWebstorageModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    FormsModule,ReactiveFormsModule,
    NgbModule
  ],
  providers: [{provide:HTTP_INTERCEPTORS,useClass:HttpClientInterceptor,multi:true}],//{provide:HTTP_INTERCEPTORS,useClass:HttpClientInterceptor,multi:true}
  bootstrap: [AppComponent]
})
export class AppModule { }
