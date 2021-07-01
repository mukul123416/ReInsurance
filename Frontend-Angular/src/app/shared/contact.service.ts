import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Contact} from './contact.model';
import {Subscribed} from './subscribed.model';


@Injectable({
  providedIn: 'root'
})
export class ContactService {

  selectedContact:Contact;
  contacts:Contact[];
  selectedSubscribed:Subscribed;
  Subscribeds:Subscribed[];

  readonly baseURL = 'http://localhost:8080/contacts';
  readonly baseURL2 = 'http://localhost:8080/subscribed';

  constructor(private http:HttpClient) { }

  postContact(con:Contact){
    return this.http.post(this.baseURL,con);
  }

  getContact(){
    return this.http.get(this.baseURL);
  }

  postSubscribed(sub:Subscribed){
    return this.http.post(this.baseURL2,sub);
  }

  getSubscribed(){
    return this.http.get(this.baseURL2);
  }
}
