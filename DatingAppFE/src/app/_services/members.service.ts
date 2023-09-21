import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, of, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Member } from '../_models/Member';
import { PaginatedResult } from '../_models/Pagination';
import { User } from '../_models/User';
import { UserParams } from '../_models/UserParams';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  baseUrl=environment.apiUrl;
  members: Member[] = [];
  memberCache = new Map();
  user?: User | null;
  userParams: UserParams | undefined;

//paginationResult:PaginatedResult<Member[]>=new PaginatedResult<Member[]>();
//userParams: UserParams | undefined;


  constructor(private http:HttpClient, private accountService: AccountService) {

    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: user => {
        if (user)
          this.userParams = new UserParams(user);
          this.user = user;
      }
    })

   }

   getUserParams() {
    return this.userParams;
  }

  setUserParams(userParams: UserParams) {
    this.userParams = userParams;
  }

  resetUserParams() {
    if (this.user) {
      this.userParams = new UserParams(this.user);
      return this.userParams;
    }
    return;
  }
  getMembers(userParams:UserParams){
  //return   this.http.get<Member[]>(this.baseUrl+"users");
  //if (this.members.length > 0) return of(this.members);

  // let params=new HttpParams()

  // if(page && itemPerPage){
  //   params=params.append('pageNumber',page);
  //   params=params.append('pageSize',itemPerPage);
  // }
  const response = this.memberCache.get(Object.values(userParams).join('-'));

  if (response) return of(response);
  let params=this.getPaginationHeaders(userParams.pageNumber,userParams.pageSize);
  params = params.append('minAge', userParams.minAge);
  params = params.append('maxAge', userParams.maxAge);
  params = params.append('gender', userParams.gender);
  params = params.append('orderBy',userParams.orderBy)
//   return this.http.get<Member[]>(this.baseUrl + 'users',{observe:'response',params}).pipe(
//     // map(members => {
//     //   this.members = members;
//     //   return members;
//     // })

//     map(response => {
//       if(response.body){
// this.paginationResult.result=response.body;
//       }
//       const pagination=response.headers.get('Pagination');

//       if(pagination){
//         this.paginationResult.pagination=JSON.parse(pagination);
//       }
//       return this.paginationResult;
//     })
 // )
 return this.getPaginatedResult<Member[]>(this.baseUrl + 'users', params).pipe(
  map(response => {
    this.memberCache.set(Object.values(userParams).join('-'), response);
    return response;
  })
)
  }

  
  private getPaginatedResult<T>(url: string, params: HttpParams) {
    const paginatedResult: PaginatedResult<T> = new PaginatedResult<T>();
    return this.http.get<T>(url, { observe: 'response', params }).pipe(
      map(response => {
        if (response.body) {
          paginatedResult.result = response.body;
        }
        const pagination = response.headers.get('Pagination');
        if (pagination) {
          paginatedResult.pagination = JSON.parse(pagination);
        }
        return paginatedResult;
      })
    );
  }
  private getPaginationHeaders(pageNumber: number, pageSize: number) {
    let params = new HttpParams();

    params = params.append('pageNumber', pageNumber);
    params = params.append('pageSize', pageSize);

    return params;
  }


  getMember(username:string){
    //this.http.get<Member>(this.baseUrl+"users/"+userName,this.getOptions());
    // const member = this.members.find(x => x.userName === userName);
    // if (member !== undefined) return of(member);

    const member = [...this.memberCache.values()]
      .reduce((arr, elem) => arr.concat(elem.result), [])
      .find((member: Member) => member.userName === username);

    if (member) return of(member);
  return  this.http.get<Member>(this.baseUrl+"users/"+username);
  
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

  setMainPhoto(photoId: number) {
    return this.http.put(this.baseUrl + 'users/set-main-photo/' + photoId, {});
  }
  deletePhoto(photoId: number) {
    return this.http.delete(this.baseUrl + 'users/delete-photo/' + photoId);
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




