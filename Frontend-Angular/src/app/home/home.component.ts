import { Component, OnInit,Input,HostListener} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {ContactService} from '../shared/contact.service';
import { NgForm } from '@angular/forms';
import { Subscribed } from '../shared/subscribed.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  wishlist:number[]=[]
  isShow: boolean;
  topPosToStartShowing = 2000;

  constructor(private toaster: ToastrService,public contactservice:ContactService) { }

  ngOnInit(): void {
    this.refreshSubscribedList();
    this.resetForm();
  }

  
resetForm(form?:any){
  if (form)
  form.reset();
  this.contactservice.selectedSubscribed={
    EMAIL:"",
  }
}

onSubmit(form?:NgForm){
  this.contactservice.postSubscribed(form.value).subscribe((res) => {
    this.resetForm(form);
    this.toaster.show('Subscribed!!');
  })
}

refreshSubscribedList(){
  this.contactservice.getSubscribed().subscribe((res)=> {
    this.contactservice.Subscribeds=res as Subscribed[];
  });
}

@HostListener('window:scroll')
checkScroll() {
 const scrollPosition=window.pageYOffset;
 if (scrollPosition >= this.topPosToStartShowing) {
  this.isShow = true;
} else {
  this.isShow = false;
}
}

gotoTop() {
  window.scroll({ 
    top:0, 
    left: 0, 
    behavior: 'smooth' 
  });
}

}
