import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
  constructor(public accountService:AccountService, private router:Router, private toastr:ToastrService ) { }

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
      next: res => this.router.navigateByUrl('/members'),
      error: err=>this.toastr.error(err.error)
      
    })
 
    
  }
  logout(){
   // this.loggedIn=false;
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }


  

}
