import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {UserService} from '../shared/user.service';
import { Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class Guard1Guard implements CanActivate {
  constructor(private userService : UserService,private router : Router,private toaster: ToastrService){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean{
      if (!this.userService.isLoggedIn1()) {
        this.toaster.show("Please, SignIn First With Email and Password!!");
        this.router.navigate(['SignIn']);
        return false;
      }
    return true;
  }
  
}
