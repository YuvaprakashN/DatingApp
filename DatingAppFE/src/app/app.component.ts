import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  host:string="http://localhost:5125/";
  title = 'dating-app-fe';

  users:any;
  constructor(private http:HttpClient){}
  ngOnInit(): void {
    
    this.http.get(this.host+"api/users").subscribe({
      next:res=>{this.users=res;console.log(this.users);
      },
      error:err=>console.log(err),
      complete:()=>console.log("Req complted")
    })
    
  }



}
