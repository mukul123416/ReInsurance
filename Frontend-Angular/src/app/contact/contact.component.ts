import { Component, OnInit } from '@angular/core';
import {ContactService} from '../shared/contact.service';
import { NgForm } from '@angular/forms';
import {Contact} from '../shared/contact.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  showSuccessMessage:boolean;

  constructor(public contactservice:ContactService,private toaster: ToastrService) { }

  ngOnInit(): void {
    this.resetForm();
    this.refreshContactList();
    this.resettForm();
  }

  resetForm(form?:any){
    if (form)
    form.reset();
    this.contactservice.selectedContact={
      name:"",
      email:"",
      message:"",
      subject:"",
      date:""
    }
  }
  
  onSubmit(form?:NgForm){
    this.contactservice.postContact(form.value).subscribe((res) => {
      this.resetForm(form);
      this.refreshContactList()
      this.showSuccessMessage=true;
      setTimeout(()=>this.showSuccessMessage=false,3000);
    })
  }
  
  refreshContactList(){
    this.contactservice.getContact().subscribe((res)=> {
      this.contactservice.contacts=res as Contact[];
    });
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
      this.resettForm(form);
      this.toaster.show('Subscribed!!');
    })
  }

}
