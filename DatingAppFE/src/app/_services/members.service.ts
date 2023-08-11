import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Member } from '../_models/Member';

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  baseUrl=environment.apiUrl;
  constructor(private http:HttpClient) { }

  getMembers(){
  return   this.http.get<Member[]>(this.baseUrl+"users");
  }

  getMember(userName:string){
    //this.http.get<Member>(this.baseUrl+"users/"+userName,this.getOptions());
  return  this.http.get<Member>(this.baseUrl+"users/"+userName);
  }

//   getOptions(){
//     var userString=localStorage.getItem("user");
//     console.log(userString);
//     if(!userString) return;

//     const user=JSON.parse(userString);
// console.log(user);

//     return {
//       headers: new HttpHeaders({Authorization:"Bearer "+user.token})
//     }
//   }
}
