import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { MersetaService } from 'src/app/service/merseta.service';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent{
  public resetForm:FormGroup;
  oldPassword:string;
  otp:string;
  newPassword:string;
  id:string;
  errorMessage:string;
  private $route: ActivatedRoute
  
  
  constructor(
    private formBuilder: FormBuilder,
    private mersetaservice: MersetaService,
    private activatedRoute: ActivatedRoute
  ) {

    this.resetForm = this.formBuilder.group({
      oldPassword: new FormControl('', []),
      otp: new FormControl('', []),
      newPassword: new FormControl('', []),
      errorMessage: new FormControl('', [])
    });

    this.activatedRoute.queryParams.subscribe(params => {
       this.id = atob(params['id']);
  });

   }

   public btn_reset() {
    
    //console.log("email: " + this.resetForm.get('email').value);
    this.oldPassword = this.resetForm.get('oldPassword').value;
    this.otp = this.resetForm.get('otp').value;
    this.newPassword = this.resetForm.get('newPassword').value;

       this.mersetaservice.resetPass(this.oldPassword, this.otp, this.newPassword, this.id)
      .subscribe(
         response => {
          // = JSON.parse(response);
          if(response['message'] == "Password Reset was successfull")
          {
            window.location.href = "/#/login";
          }
          else{
            //alert(response['message']);
            this.errorMessage = response['message'];
          }
          
         }
      );

   }

}
