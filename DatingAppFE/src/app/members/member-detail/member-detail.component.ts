import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Member } from 'src/app/_models/Member';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit{
  member: Member | undefined;
  
  constructor(private memberService:MembersService,private route:ActivatedRoute){}
  ngOnInit(): void {
    console.log("Member-Detail");
    
    this.loadMember();
    
  }

  loadMember(){
    const userName=this.route.snapshot.paramMap.get("username");
    console.log(this.route.snapshot.paramMap);
    
console.log("user "+userName);

    if(!userName) return;

    this.memberService.getMember(userName).subscribe({
next:member=>{
  this.member=member;

}

    });

  }



}
