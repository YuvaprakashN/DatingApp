import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerMode = false;
  model: any = {}

// @Input() userFromHomeComp:any;
@Output() cancelRegisterEmitter=new EventEmitter();

  constructor(private accountService:AccountService,private toastr:ToastrService) { }

  ngOnInit(): void {
  }

  registerToggle() {
    this.registerMode = !this.registerMode;
  }
  cancel(){
    console.log("Cancelled");
    this.cancelRegisterEmitter.emit(false);
    
  }

  register(){
    console.log(this.model);
    this.accountService.register(this.model).subscribe({
      next: () => {
        this.cancel();
      },
      error: error => this.toastr.error(error)
      
    })
  }

}
