import { Component, OnInit } from '@angular/core';
import { Observable, take } from 'rxjs';
import { Member } from 'src/app/_models/Member';
import { Pagination } from 'src/app/_models/Pagination';
import { User } from 'src/app/_models/User';
import { UserParams } from 'src/app/_models/UserParams';
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit{
  
  //members:Member[]=[];
  members$:Observable<Member[]>|undefined;
  members: Member[] = [];
  pagination: Pagination | undefined;
  userParams: UserParams | undefined;
  user:User|undefined;

  constructor(private memberService:MembersService,private accountservice:AccountService ){

    accountservice.currentUser$.pipe(take(1)).subscribe({
      next:user =>{
        if(user){
          this.userParams=new UserParams(user);
          this.user=user;
        }
      }
    })
  }
  ngOnInit(): void {
    console.log("Member List Compoennt Loaded");
    this.loadMembers();
    //this.members$=this.memberService.getMembers();
  }

   loadMembers() {
     if(!this.userParams) return;
     this.memberService.getMembers(this.userParams).subscribe({
       next:response=>{
         if(response.result && response.pagination){
           this.members=response.result;
           this.pagination=response.pagination;
         }
       },
       error:e=>console.log(e)
     })
   }

   pageChanged(event:any){

    if(event.page != this.userParams?.pageNumber && this.userParams){
      this.userParams.pageNumber=event.page;
      this.loadMembers();
    }
   }
}
