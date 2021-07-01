import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {UserService} from '../shared/user.service';
import { ToastrService } from 'ngx-toastr';
import {ContactService} from '../shared/contact.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  response:any={};
  flag5:boolean;
  response1:any={};
  flag7:boolean;

  constructor(public userService:UserService,public router:Router,private toaster: ToastrService,public contactservice:ContactService) { 
    
  }

  ngOnInit(): void {
    this.resetForm();
    this.resettForm();
  }

   onLogout(){
     this.router.navigate(['SignIn']);
   }

   resetForm(form?:any){
    if (form)
    form.reset();
    this.contactservice.selectedSubscribed={
      EMAIL:"",
    }
  }

  resettForm(form?:any) {
    if (form)
      form.reset();
    this.userService.selectedPurpose = {
      firstName: "",
      lastName:"",
      email:"",
      companyName:"",
      amount:null,
      documents:"",
      purpose:"",
      description:""
    }
  }

  onSubmit(form?:NgForm){
    this.contactservice.postSubscribed(form.value).subscribe((res) => {
      this.resetForm(form);
      this.toaster.show('Subscribed!!');
    })
  }

  onSubmitt(form?:NgForm){
    this.userService.postPurpose(form.value);
    this.response={flag5:true};
    localStorage.setItem("inReviewBar",this.response.flag5);
    this.response1={flag7:true};
    localStorage.setItem("inCompletedBar",this.response1.flag7);
    this.resettForm(form);
    this.toaster.show('Successfully Created Request!!');
    this.router.navigate(['UserProfile']);
  }

}
