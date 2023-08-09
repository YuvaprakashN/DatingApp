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
    this.http.get<Member[]>(this.baseUrl+"users",this.getOptions());
  }

  getMember(userName:string){
    this.http.get<Member>(this.baseUrl+"users/"+userName,this.getOptions());
  }

  getOptions(){
    var userString=localStorage.getItem("users");
    if(!userString) return;

    const user=JSON.parse(userString);

    return {
      headers: new HttpHeaders({Authorization:"Bearer "+user.token})
    }
  }
}
