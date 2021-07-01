import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { ContactComponent } from './contact/contact.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { InsuranceComponent } from './insurance/insurance.component';
import { ProposedlistComponent } from './proposedlist/proposedlist.component';
import { GuardGuard } from './auth/guard.guard';
import { Guard1Guard } from './auth/guard1.guard';
import { UserprofileComponent } from './userprofile/userprofile.component';

const routes: Routes = [
  {path:'',redirectTo:'/Home',pathMatch:'full'},
  {path:'Home',component:HomeComponent},
 {path:'Profile',component:ProfileComponent,canActivate:[Guard1Guard]},
 {path:'SignUp',component:SignupComponent},
 {path:'SignIn',component:SigninComponent},
 {path:'Contact',component:ContactComponent},
 {path:'ResetPassword',component:ResetpasswordComponent},
 {path:'ForgotPassword',component:ForgotpasswordComponent},
 {path:'Insurance',component:InsuranceComponent,canActivate:[GuardGuard]},
 {path:'Proposed',component:ProposedlistComponent,canActivate:[GuardGuard]},
 {path:'UserProfile',component:UserprofileComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
