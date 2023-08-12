import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { Member } from 'src/app/_models/Member';
import { User } from 'src/app/_models/User';
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit{

  member:Member | undefined;
  user:User|null=null;

constructor(private memberService:MembersService,private accountService:AccountService){
  this.accountService.currentUser$.pipe(take(1)).subscribe(
    u=>this.user=u
  );

}
  ngOnInit(): void {
    this.loadMember();
  }


  loadMember(){
    if(!this.user) return;
    
   this.memberService.getMember(this.user.username).subscribe(m=>this.member=m);
  }



}
