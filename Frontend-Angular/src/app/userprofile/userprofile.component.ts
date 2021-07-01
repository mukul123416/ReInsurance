import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {ContactService} from '../shared/contact.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {

  Purposaldata:any={};
  inReviewBar: boolean;
  inProgressBar:boolean;
  inCompletedBar: boolean;

  constructor(public router:Router,private toaster: ToastrService,public contactservice:ContactService) { }

  ngOnInit(): void {
    this.Purposaldata=JSON.parse(localStorage.getItem('PurposalData'));
    console.log(this.Purposaldata);
    this.inReviewBar=JSON.parse(localStorage.getItem("inReviewBar"));
    this.inProgressBar=JSON.parse(localStorage.getItem("inProgressBar"));
    this.inCompletedBar=JSON.parse(localStorage.getItem("inCompletedBar"));
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
