import { Component, OnInit } from '@angular/core';
import {ContactService} from '../shared/contact.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import * as $ from 'jquery';
import {UserService} from '../shared/user.service';

@Component({
  selector: 'app-proposedlist',
  templateUrl: './proposedlist.component.html',
  styleUrls: ['./proposedlist.component.css']
})
export class ProposedlistComponent implements OnInit {

  retrieveData: string;
 
  selectedItems = [];
  flag3:boolean;
  Purposaldata:any={};
  flag8:boolean;
  flag9:boolean;
  flag10:boolean;
  Purposaldata8:any={};
  Purposaldata9:any={};
  Purposaldata10:any={};

  constructor(public contactservice:ContactService,private toaster: ToastrService,public userService:UserService) { }

  ngOnInit(): void {
    this.Purposaldata=JSON.parse(localStorage.getItem('PostProposalData'));
    this.flag3=JSON.parse(localStorage.getItem('Flag'));
    this.resettForm();
    this.resetForm();
  }

  resettForm(form?:any){
    if (form)
    form.reset();
    this.contactservice.selectedSubscribed={
      EMAIL:"",
    }
  }

  resetForm(form?:any){
    if (form)
    form.reset();
    this.userService.selectedProposed={
      amount:null,
      tenure:"",
      policyDetails:""
    }
  }

  onSubmitt(form?:NgForm){
    this.contactservice.postSubscribed(form.value).subscribe((res) => {
      this.resettForm(form);
      this.toaster.show('Subscribed!!');
    })
  }

  onSubmit(form?:NgForm){
    this.retrieveData = localStorage.getItem("data1");
    console.log(this.retrieveData);
    form.value["otherParty"] = this.retrieveData;
    console.log(form.value);
    this.userService.postProposedData(form.value).subscribe(res => {
      this.resetForm(form);
      if(res){
        this.Purposaldata8={flag8:true};
        localStorage.setItem("inReviewBar",this.Purposaldata8.flag8);
        this.Purposaldata9={flag9:true};
        localStorage.setItem("inProgressBar",this.Purposaldata9.flag9);
        this.Purposaldata10={flag10:false};
        localStorage.setItem("inCompletedBar",this.Purposaldata10.flag10);
        console.log(res); 
        this.toaster.show('Successfully Bided!!');
      }
    },
    err =>{
        console.log(err);
        this.toaster.show('Something went wrong!!');
    }); 
  }

  cancel(){
    this.toaster.show('You have successfully declined the proposal!!');
    localStorage.setItem("cancelMessage", "The proposal has been declined by SBI!!");
  };
  
}
