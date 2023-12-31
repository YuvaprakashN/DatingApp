import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
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

  @ViewChild("editForm") editForm:NgForm | undefined;
  member:Member | undefined;
  user:User|null=null;
  @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any) {
    if (this.editForm?.dirty) {
      $event.returnValue = true;
    }
  }
constructor(private memberService:MembersService,private accountService:AccountService,private toastrService:ToastrService ){
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

  updateMember(){
    this.memberService.updateMember(this.editForm?.value).subscribe({
      next: _ => {
        this.toastrService.success('Profile updated successfully');
        this.editForm?.reset(this.member);
      }
    })
  }


}
