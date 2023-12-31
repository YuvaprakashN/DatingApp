import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from './_models/User';
import { AccountService } from './_services/account.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  host:string="http://localhost:5125/";
  title = 'dating-app-fe';

  // users:any;
  constructor(private http:HttpClient,private accountService:AccountService){}
  ngOnInit(): void {
    

    console.log("APP START");

    let St:string="String Type";
   console.log("1: "+    St.toUpperCase());

   let at:any="any type";
   //at.toUpper();
   //console.log("2: "+at.toUpper());
   console.log("2: "+at.toUpperCase());

   let ot:Object="obj type";
   //ot.toUpperCase();


    console.log("APP END");
    
    




  //  this.getUsers();
    this.setCurrentUser();
    
    
   


  }


  setCurrentUser() {
    //const user1: User =JSON.parse(localStorage.getItem('user')!);
    const userString = localStorage.getItem('user');
    console.log(userString);
    
    if (!userString) return;
    const user: User = JSON.parse(userString);
    console.log(user);
    
    this.accountService.setCurrentUser(user);
  }


}
