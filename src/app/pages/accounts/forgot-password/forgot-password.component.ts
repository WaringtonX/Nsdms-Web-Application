import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { MersetaService } from '../../../service/merseta.service';
declare var $: any;

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
})
export class ForgotPasswordComponent {
  public forgotForm:FormGroup;
  email:string;
  constructor(
    private formBuilder: FormBuilder,
    private mersetaservice: MersetaService,
    private router: Router
  ) {
    this.forgotForm = this.formBuilder.group({
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$'),
      ])
    });

    this.forgotForm = new FormGroup(this.forgotForm.controls, {
      updateOn: 'change',
    });

  }

  public btn_forgot() {
    
    console.log("email: " + this.forgotForm.get('email').value);
    this.email = this.forgotForm.get('email').value;
    if(!this.forgotForm.get('email').hasError('pattern'))
    {
       this.mersetaservice.forgotPass(this.forgotForm.get('email').value)
      .subscribe(
         response => {
          // this.proccessID = response;
          this.router.navigateByUrl('/login');
          alert("Please check your email for password recovery instructions");
         },
         err => {
          if (err.status == 400) alert('Username does not exist'); 
          else console.log(err);
        }
      );
    }


   }

 
 
  

}
