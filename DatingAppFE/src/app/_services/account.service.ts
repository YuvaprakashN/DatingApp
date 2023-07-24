import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject,map } from 'rxjs';
import { User } from '../_models/User';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
baseUrl="http://localhost:5125/api";

private currentUserSource = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSource.asObservable();
  constructor(private http:HttpClient) { }

  login(model:User){
    return this.http.post<User>(this.baseUrl+'/account/login',model)
    .pipe(
      map((res:User)=> {
      const user=res;
      if(user)
      localStorage.setItem("user",JSON.stringify(user));
      this.currentUserSource.next(user);
    }));
  }
  
  register(model: any) {
    return this.http.post<User>(this.baseUrl + 'account/register', model).pipe(
      map((user:User) => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
        }
      })
    )
  } 

  setCurrentUser(user: User) {
    console.log("New User Set: "+user);
    this.currentUserSource.next(user);
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }
}
