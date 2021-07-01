import { Component, OnInit } from '@angular/core';
import {UserService} from '../shared/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {
  serverErrorMessages: string;
  server:boolean;
  constructor(public userService:UserService,public router:Router) { }

  ngOnInit(): void {
  }

  onSubmit(form:any) {
    this.userService.reset(form.value).subscribe(
      res => {
        
          alert("Success");
          this.router.navigate(['ForgotPassword']);
      },
        err => {
            this.serverErrorMessages=err.error.error;
            this.server=true;
         setTimeout(()=>this.server=false,3000);
          
     } 
          
      
    );
  }

}
