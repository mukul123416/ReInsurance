import { Component, OnInit } from '@angular/core';
import {ContactService} from '../shared/contact.service';
import {UserService} from '../shared/user.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-insurance',
  templateUrl: './insurance.component.html',
  styleUrls: ['./insurance.component.css']
})
export class InsuranceComponent implements OnInit {

  constructor(public contactservice:ContactService,public userService:UserService,private toaster: ToastrService) { }

  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};

  PurposalList={};
  Purposaldata:any={};
  PostPurposaldata:any={};
  PostPurposaldataParty:String;
  PostPurposaldataParty1:number;
  PostPurposaldataParty2:number;
  bidData:any={};
  flag3:boolean;
  flag4:boolean=true;
  flag5:boolean;
  flag6:boolean;
  finalAmount:number;
  x: number;
  y: number;
  z: number;
  z1: string;
  citrus: string;
  CancelMessage: String;
  Cancel: boolean=true;
  response: any={};
  response2: any={};

  ngOnInit(): void {

    try {
      if (localStorage.getItem("cancelMessage")){

        this.PostPurposaldata=JSON.parse(localStorage.getItem("PostProposalData"));
        this.PostPurposaldataParty1=this.PostPurposaldata.otherParty.search("O");
        this.PostPurposaldataParty2=this.PostPurposaldata.otherParty.search("L");
        this.PostPurposaldataParty=this.PostPurposaldata.otherParty.slice(this.PostPurposaldataParty1+2,this.PostPurposaldataParty2-1);

        this.CancelMessage=this.PostPurposaldataParty;
        this.Purposaldata=JSON.parse(localStorage.getItem('PurposalData'));
        this.Cancel=false;
        localStorage.removeItem("cancelMessage");
      } else {
        this.bidData=JSON.parse(localStorage.getItem('bidData'));
        this.Purposaldata=JSON.parse(localStorage.getItem('PurposalData'));
        this.finalAmount=this.Purposaldata.amount - this.bidData.amount;
        console.log(this.finalAmount);
        this.flag4=false;

        this.PostPurposaldata=JSON.parse(localStorage.getItem("PostProposalData"));
        this.PostPurposaldataParty1=this.PostPurposaldata.otherParty.search("O");
        this.PostPurposaldataParty2=this.PostPurposaldata.otherParty.search("L");
        this.PostPurposaldataParty=this.PostPurposaldata.otherParty.slice(this.PostPurposaldataParty1+2,this.PostPurposaldataParty2-1);

      }
    } catch (error) {
      console.log(error);
    }
    this.flag3=JSON.parse(localStorage.getItem('Flag'));
    this.resettForm();
    this.dropdownList = [
      { item_id: 2, item_text: 'ICICI' },
      { item_id: 3, item_text: 'SBI' },
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
    var retrievedPurposalData = localStorage.getItem('PurposalData');
    this.PurposalList=JSON.parse(retrievedPurposalData);

    if(item.item_text=="HDFC"){
      this.PurposalList["otherParty"]='O=' +item.item_text+ ',L=Lucknow,C=IN';
    }else if (item.item_text=="ICICI") {
      this.PurposalList["otherParty"]='O=' +item.item_text+ ',L=Delhi,C=IN';
    }else if (item.item_text=="SBI"){
      this.PurposalList["otherParty"]='O=' +item.item_text+ ',L=Mumbai,C=IN';
    }

    console.log(item);
    console.log(this.PurposalList);
  }



  onSelectAll(items: any) {
    console.log(items);
    console.log(items.item_text);
  }

  SentPurposalData(){
    this.userService.postPurposeData(this.PurposalList).subscribe(res => {
      if(res){
        this.x=res.search("lender");
        this.citrus=res.slice(this.x);
        this.y=this.citrus.search("O");
        this.z=this.citrus.search("N");
        this.z1=this.citrus.slice(this.y, this.z + 1);
        console.log(this.z1);
        localStorage.setItem("data1", this.z1);
        this.response={flag5:false};
        localStorage.setItem("inReviewBar",this.response.flag5);
        this.response2={flag6:false};
        localStorage.setItem("inProgressBar",this.response2.flag6);

        this.PostPurposaldata=JSON.parse(localStorage.getItem("PostProposalData"));
        this.PostPurposaldataParty1=this.PostPurposaldata.otherParty.search("O");
        this.PostPurposaldataParty2=this.PostPurposaldata.otherParty.search("L");
        this.PostPurposaldataParty=this.PostPurposaldata.otherParty.slice(this.PostPurposaldataParty1+2,this.PostPurposaldataParty2-1);
        
        this.toaster.show('Proposal has been sent successfully!!');
      }
    },
    err =>{
      console.log(err);
      this.toaster.show('Something went wrong!!');
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
