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

  users:any;
  constructor(private http:HttpClient,private accountService:AccountService){}
  ngOnInit(): void {
    
   this.getUsers();
    this.setCurrentUser();
  }

getUsers(){
 this.http.get(this.host+"api/users").subscribe({
      next:res=>{this.users=res;console.log(this.users);
      },
      error:err=>console.log(err),
      complete:()=>console.log("Req complted")
    })
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
