import { Component, OnInit } from '@angular/core';
import {UserService} from '../shared/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {
  serverErrorMessages: string;
  server:boolean;
  constructor(public userService:UserService,public router:Router) { }

  ngOnInit(): void {
  }
  onSubmit(form:any) {
    this.userService.forgot(form.value).subscribe(
      res => {
          alert("Updated Successfully.");
          this.router.navigate(['SignIn']);
        },
        err => {
          this.serverErrorMessages=err.error.error;
          this.server=true;
       setTimeout(()=>this.server=false,3000);
        }
          
    );
  }

}
