import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  host:string="http://localhost:5125/";
  registerMode = false;
  users: any;

  constructor(private http: HttpClient,private router:Router ) { }

  ngOnInit(): void {
    console.log("Home Compoennt Loaded");
    

   //this.getUsers();
  }

  registerToggle() {

    var username:String='kirkland';
    this.router.navigate(['/members',username,'detail'])
    //this.registerMode = !this.registerMode;
  }

  
// getUsers(){
//   this.http.get(this.host+"api/users").subscribe({
//        next:res=>{this.users=res;console.log(this.users);
//        },
//        error:err=>console.log(err),
//        complete:()=>console.log("Req complted")
//      })
//  }

 cancelRegisterMode(event:boolean){
this.registerMode=event;
 }
}
