import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FileUploadModule } from 'ng2-file-upload';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ToastrModule.forRoot({positionClass:'toast-bottom-right'}),
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    NgxSpinnerModule.forRoot({
      type: 'line-scale-party'
    }),
    BsDatepickerModule.forRoot(),
    FileUploadModule,

  ],
  exports:[
    BsDropdownModule,
    ToastrModule,
    TabsModule,
    NgxSpinnerModule,
    FileUploadModule,
    BsDatepickerModule
  ]
})
export class SharedModule { }
