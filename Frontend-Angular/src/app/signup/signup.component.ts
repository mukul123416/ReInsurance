import { Component, OnInit } from '@angular/core';
import {UserService} from '../shared/user.service';
import { NgForm } from '@angular/forms';
import {User} from '../shared/user.model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {ContactService} from '../shared/contact.service';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [UserService]
})
export class SignupComponent implements OnInit {

  showSuccessMessage:boolean;
  serverErrorMessages:String;
  server:boolean;

  constructor(public userService:UserService,public router:Router,private toaster: ToastrService,public contactservice:ContactService) { }

  ngOnInit(): void {
    this.resetForm();
    this.resettForm();
  }

  resetForm(form?:any) {
    if (form)
      form.reset();
    this.userService.selectedUser = {
      userId: "",
      fName:"",
      lName:"",
      email:"",
      companyName:"",
      password:null
    }
  }

  onSubmit(form?:NgForm) {
    this.router.navigate(['SignIn']);
    localStorage.setItem("Email",form.value.email);
      this.userService.postUser(form.value).subscribe(res => {
        this.resetForm(form);
        if(res){
          this.showSuccessMessage=true;
          setTimeout(()=>this.showSuccessMessage=false,3000);
          this.router.navigate(['SignIn']);
          console.log(res); 
          this.toaster.show('Successfully SignUp!!');
        }
      },
      err =>{
           if(err.status === 422){
             this.serverErrorMessages=err.error;
             this.server=true;
          setTimeout(()=>this.server=false,3000);
           }
      } 
      );
    }


    resettForm(form?:any){
      if (form)
      form.reset();
      this.contactservice.selectedSubscribed={
        EMAIL:"",
      }
    }
  
    onSubmitt(form?:NgForm){
      this.contactservice.postSubscribed(form.value).subscribe((res) => {
        this.resetForm(form);
        this.toaster.show('Subscribed!!');
      })
    }
}
