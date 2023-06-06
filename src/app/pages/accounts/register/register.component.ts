import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { MersetaService } from '../../../service/merseta.service';
import {TabViewModule} from 'primeng/tabview';
import { PrimeIcons, SelectItem } from 'primeng/api';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [`
  :host ::ng-deep .tabview-custom {
    i, span {
        vertical-align: middle;
    }

    span {
        margin: 0 .5rem;
    }
}

:host ::ng-deep .p-button {
    margin-right: .25rem;
}

:host ::ng-deep .p-tabview p {
    line-height: 1.5;
    margin: 0;
}
  `]
})
export class RegisterComponent implements OnInit {
  public registrationForm:FormGroup;
createDate: any; //Auto add
  dateOfBirth: any; //Auto add
  email: any;
  faxNumber: any;
  firstName: any;
  lastName: any;
  passportNumber: any; //Same as ID Number
  registrationDate: any; //Auto add
  rsaIdNumber: any;
  password: any;
  telNumber: any;
  username: any;

  constructor(private formBuilder: FormBuilder, private mersetaservice: MersetaService,) {
        this.registrationForm = this.formBuilder.group({
          createDate: new FormControl('', [Validators.required]),
          dateOfBirth: new FormControl(''),
          registrationDate: new FormControl(''),
          faxNumber: new FormControl('', [Validators.required]),
          telNumber: new FormControl(''),
          firstName: new FormControl('', [Validators.required]),
          lastName: new FormControl(''),
          passportNumber: new FormControl('', [Validators.required]),
          rsaIdNumber: new FormControl(''),
          email: new FormControl('', [
            Validators.required,
            Validators.email,
            Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$'),
          ]),
          password: new FormControl('', [Validators.required]),
          username: new FormControl(''),
        });
      }

  
  ngOnInit(): void {
  }

  register(){
    this.mersetaservice.register(this.registrationForm).subscribe(
      (res:any)=>{
        if(res.status =="Success"){
          console.log(res);
          alert("User has been registered");
        }else{
          console.log(res);
          alert("Registration did not happen, please contact your administrator");
        }

      }, err=>{console.log(err);}
    );
  }

}
