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
  genderList = [{ value: 'male', display: 'Males' }, { value: 'female', display: 'Females' }]

  

  constructor(private memberService:MembersService,private accountservice:AccountService ){

    this.userParams = this.memberService.getUserParams();
  }
  ngOnInit(): void {
    console.log("Member List Compoennt Loaded");
    this.loadMembers();
    //this.members$=this.memberService.getMembers();
  }

   loadMembers() {
     if(this.userParams)
     {
      this.memberService.setUserParams(this.userParams);


      this.memberService.getMembers(this.userParams).subscribe({
        next:response=>{
          if(response.result && response.pagination){
            this.members=response.result;
            this.pagination=response.pagination;
          }
        },
      })
     }
    
   }
   resetFilters() {
    this.userParams = this.memberService.resetUserParams();
    this.loadMembers();
  }

   pageChanged(event:any){

    if(event.page != this.userParams?.pageNumber && this.userParams){
      this.memberService.setUserParams(this.userParams);
      this.userParams.pageNumber=event.page;
      this.loadMembers();
    }
   }
}
