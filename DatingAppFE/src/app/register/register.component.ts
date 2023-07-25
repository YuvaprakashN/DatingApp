import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerMode = false;
  model: any = {}

@Input() userFromHomeComp:any;
@Output() cancelRegisterEmitter=new EventEmitter();

  constructor(private http: HttpClient) { }

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
    
  }

}
