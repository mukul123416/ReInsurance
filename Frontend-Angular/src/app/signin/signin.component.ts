import { Component, OnInit } from '@angular/core';
import {UserService} from '../shared/user.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {ContactService} from '../shared/contact.service';



@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
 
})
export class SigninComponent implements OnInit {
  serverErrorMessages: string;
  server:boolean;

  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  response:any={};
  flag:boolean;
  
  constructor(public userService:UserService,public router:Router,private toaster: ToastrService,public contactservice:ContactService) { }

  ngOnInit(): void {
    this.resetForm();
    this.resettForm();
    this.dropdownList = [
      { item_id: 1, item_text: 'USER' },
      { item_id: 2, item_text: 'BANK' },
    ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }

  onItemSelect(item: any) {
    console.log(item);
  }

  onSelectAll(items: any) {
    console.log(items);
  }


  onSubmit(form?:NgForm){
    if(form.value.email.includes(this.userService.selectedLogin.role)){
      this.userService.login(form.value);
      if(form.value.email=="Bank@ICICI.com"){
        this.response={flag:true}
        localStorage.setItem("Flag",this.response.flag);
      }else if(form.value.email=="Bank@SBI.com"){
        this.response={flag:false}
        localStorage.setItem("Flag",this.response.flag);
      }
      console.log(form.value);
      this.toaster.show('Successfully Login!!');
      this.resettForm();
    }else{
    this.toaster.show('Invalid Email!!');
  }
}

  resettForm(form?:any) {
    if (form)
      form.reset();
    this.userService.selectedLogin = {
      role:"User",
      email:"",
      password:null
    }
  }


  resetForm(form?:any){
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
