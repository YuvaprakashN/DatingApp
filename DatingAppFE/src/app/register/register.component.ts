import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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

  registerForm: FormGroup = new FormGroup({});

// @Input() userFromHomeComp:any;
@Output() cancelRegisterEmitter=new EventEmitter();

  constructor(private accountService:AccountService,private toastr:ToastrService,private fb:FormBuilder ) { }

  ngOnInit(): void {
    this.initializeForm();
  }


  initializeForm() {
    this.registerForm = this.fb.group({
      username: ['',[Validators.required]],
      password: ['',[Validators.required,Validators.minLength(3),Validators.maxLength(8)]],
      confirmPassword: ['',[Validators.required,this.matchValues("password")]]
    });
    this.registerForm.controls['password'].valueChanges.subscribe({
      next:()=>this.registerForm.controls["confirmPassword"].updateValueAndValidity()
    });   
  }

  matchValues(matchTo:string){

    return(control:AbstractControl)=>{
      return control.value===control?.parent?.get(matchTo)?.value?null:{noMatching:true}
    }

  }

  registerToggle() {
    this.registerMode = !this.registerMode;
  }
  cancel(){
    console.log("Cancelled");
    this.cancelRegisterEmitter.emit(false);
    
  }

  register(){

    console.log(this.registerForm.value);
     

    // console.log(this.model);
    // this.accountService.register(this.model).subscribe({
    //   next: () => {
    //     this.cancel();
    //   },
    //   error: error => this.toastr.error(error)
      
    // })
  }

}
