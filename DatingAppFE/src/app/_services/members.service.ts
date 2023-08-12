import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Member } from '../_models/Member';

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  baseUrl=environment.apiUrl;
  members: Member[] = [];


  constructor(private http:HttpClient) { }

  getMembers(){
  //return   this.http.get<Member[]>(this.baseUrl+"users");
  if (this.members.length > 0) return of(this.members);
  return this.http.get<Member[]>(this.baseUrl + 'users').pipe(
    map(members => {
      this.members = members;
      return members;
    })
  )
  }

  getMember(userName:string){
    //this.http.get<Member>(this.baseUrl+"users/"+userName,this.getOptions());
    const member = this.members.find(x => x.userName === userName);
    if (member !== undefined) return of(member);
  return  this.http.get<Member>(this.baseUrl+"users/"+userName);
  
  }

  updateMember(member: Member) {
   // return this.http.put(this.baseUrl + 'users', member);
   return this.http.put(this.baseUrl + 'users', member).pipe(
    map(() => {
      const index = this.members.indexOf(member);
      this.members[index] = { ...this.members[index], ...member }
    })
  )
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
function f(members: Member[]) {
  throw new Error('Function not implemented.');
}

