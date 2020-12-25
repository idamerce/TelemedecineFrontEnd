import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { ErrorComponent } from './components/error/error.component';

import { AuthGuard } from './auth.Guard';

const routes: Routes = [

	{path:'auth/:view',component :AuthComponent},
	{path:'home',component :HomeComponent},
	{path:'contact',component :ContactComponent},
	{path:'about',component :AboutComponent},
	{path:'error',component :ErrorComponent},
 	{path: '', redirectTo: 'home', pathMatch: 'full'},
 
	//{path:'home',component :HomeComponent, canActivate : [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
