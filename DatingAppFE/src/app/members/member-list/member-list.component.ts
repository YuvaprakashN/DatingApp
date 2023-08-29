import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Member } from 'src/app/_models/Member';
import { Pagination } from 'src/app/_models/Pagination';
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
  pageNumber=1;
  pageSize=5;

  constructor(private memberService:MembersService ){

  }
  ngOnInit(): void {
    console.log("Member List Compoennt Loaded");
    this.loadMembers();
    //this.members$=this.memberService.getMembers();
  }

   loadMembers() {
     this.memberService.getMembers(this.pageNumber,this.pageSize).subscribe({
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

    if(event.page != this.pageNumber){
      this.pageNumber=event.page;
      this.loadMembers();
    }
   }
}
