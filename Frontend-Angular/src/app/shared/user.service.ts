import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from './user.model';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import {Purpose} from './purpose.model';
import {Login} from './login.model';
import {Proposed} from './proposed.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  selectedUser:User;
  users:User[];

  selectedPurpose:Purpose;
  purposes:Purpose[];

  selectedLogin:Login;
  logins:Login[];

  selectedProposed:Proposed;
  Proposed:Proposed[];

  flag:boolean=false;
  flag1:boolean=false;


  readonly baseURL = 'http://localhost:50006/signup';
  readonly baseURL1 = 'http://localhost:50006/login';
  readonly baseURL2 = 'http://localhost:50006/proposal'; //ICICI
  readonly baseURL5 = 'http://localhost:50007/proposal'; //ICICI
  readonly baseURL4 = 'http://localhost:50007/proposed'; //SBI
  readonly baseURL6 = 'http://localhost:50006/proposed'; //SBI
  readonly baseURL3 = 'http://localhost:8080/api3/resetpassword';
 
  
  
  constructor(private http:HttpClient,public router:Router) { }

  postUser(use:User){
    console.log(use);
    localStorage.setItem('UserData',JSON.stringify(use));
    return this.http.post(this.baseURL,use);
}


login(authCredentials:any) {
  if(authCredentials.email=="User@gmail.com" && !localStorage.getItem("PurposalData")){
    this.flag1=true;
    this.flag=false;
    var retrievedUserData = localStorage.getItem('UserData');
console.log('retrievedUserData: ', JSON.parse(retrievedUserData));
this.selectedUser=JSON.parse(retrievedUserData);
this.router.navigate(['Profile']);
  } else if(authCredentials.email=="User@gmail.com" && localStorage.getItem("PurposalData")) {
    this.router.navigate(['UserProfile']);
  } else if(authCredentials.email=="User1@gmail.com" && !localStorage.getItem("PurposalData")) {
    this.flag1=true;
    this.flag=false;
    var retrievedUserData = localStorage.getItem('UserData');
console.log('retrievedUserData: ', JSON.parse(retrievedUserData));
this.selectedUser=JSON.parse(retrievedUserData);
this.router.navigate(['Profile']);
  }else if(authCredentials.email=="User1@gmail.com" && localStorage.getItem("PurposalData")) {
    this.router.navigate(['UserProfile']);
  }
  else{
    this.flag=true;
    this.flag1=false;
var retrievedUserData = localStorage.getItem('UserData');
console.log('retrievedUserData: ', JSON.parse(retrievedUserData));
this.selectedUser=JSON.parse(retrievedUserData);
this.router.navigate(['Insurance']);
  }
return  authCredentials;
}

postPurpose(pur:Purpose){
  console.log(pur);
  localStorage.setItem('PurposalData',JSON.stringify(pur));
  return pur;
}

postPurposeData(data:any){
  console.log(data);
  if(data.otherParty=="O=SBI,L=Mumbai,C=IN"){
  localStorage.setItem('PostProposalData',JSON.stringify(data));
  return this.http.post(this.baseURL2, data, {responseType: 'text'});
  }
  else{
    localStorage.setItem('PostProposalData',JSON.stringify(data));
    return this.http.post(this.baseURL5, data, {responseType: 'text'});
  }
}

postProposedData(data:any){
  console.log(data);
  if(data.otherParty=="O=ICICI, L=Delhi, C=IN"){
  localStorage.setItem("bidData", JSON.stringify(data));
  return this.http.post(this.baseURL4, data, {responseType: 'text'});
  }
  else{
    localStorage.setItem("bidData", JSON.stringify(data));
    return this.http.post(this.baseURL6, data, {responseType: 'text'});
  }
}

isLoggedIn() {
  if (this.flag)
    return true;
  else
    return false;
}

isLoggedIn1() {
  if (this.flag1)
    return true;
  else
    return false;
}

reset(data:any){
  return this.http.put(this.baseURL2,data);
}

forgot(data:any){
  return this.http.put(this.baseURL3,data);
}



}
