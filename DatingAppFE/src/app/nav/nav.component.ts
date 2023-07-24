import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../_models/User';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model:any={};
//loggedIn:boolean=false;
//currentUser$:Observable<User | null>=of(null);
  constructor(public accountService:AccountService) { }

  ngOnInit(): void {
   // this.currentUser$ =this.accountService.currentUser$;
  }

//   getCurrentUser(){
//     this.accountService.currentUser$.subscribe({
//       next: user => {
//         //this.loggedIn=!!user; console.log(user);console.log(!!user);
      
//       },
// error:err=>console.log(err)

//     })
//   }
  login(){
    this.accountService.login(this.model).subscribe({
      next: res => {
        console.log(res);
//this.loggedIn=true;
      },
      error: err=>console.log(err)
      
    })
 
    
  }
  logout(){
   // this.loggedIn=false;
    this.accountService.logout();
  }


  

}
