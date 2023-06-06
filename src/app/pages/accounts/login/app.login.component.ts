import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { MersetaService } from '../../../service/merseta.service';
import { Auth } from "src/app/model/auth.model";
import { Router } from "@angular/router";
import { LoaderService } from "src/app/loader/loader.service"; //added

@Component({
    selector: "app-login",
    templateUrl: "./app.login.component.html",
})
export class AppLoginComponent {
    public loginForm:FormGroup;
    email:string;
    password:string;
    auth:Auth;
    uRoleLifecycle: any;
    constructor(
        private formBuilder: FormBuilder,
        private mersetaservice: MersetaService,
        private router: Router,
        public loaderService: LoaderService //added
      ) {
        this.loginForm = this.formBuilder.group({
          email: new FormControl('', [
            Validators.required,
            Validators.email,
            Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$'),
          ]),
          password: new FormControl('', [Validators.required]),
          deviceID: new FormControl(''),
        });
        // this.loginForm = new FormGroup(this.loginForm.controls, {
        //   updateOn: 'change',
        // });
      }



      public btn_auth() {
        console.log("email: " + this.email);
        this.mersetaservice.AuthUser(this.email, this.password)
            .subscribe(
              response => {
                localStorage.setItem('token', response.token);
                console.log(response);
              /*  this.mersetaservice.uRoleLifecycle = response.roleDescription;
                this.mersetaservice.uName = response.firstName + ' ' + response.lastName  ;
                this.mersetaservice.uEmail = response.email;
                this.mersetaservice.user_ID = response.id;
                this.mersetaservice.uUser = response;*/
                localStorage.setItem('uRoleLifecycle',  response.roleDescription);
                localStorage.setItem('user_ID', response.id);
                localStorage.setItem('uName', response.firstName + ' ' + response.lastName);
                localStorage.setItem('uEmail', response.email);
                localStorage.setItem('currentuser', response);
                this.mersetaservice.Init();

                this.router.navigateByUrl('/main/dashboard'); //, {skipLocationChange:true});

              //  alert(this.uRoleLifecycle.toString());

                // this.proccessID = response;
                // if(response['active'] == 0)
                // {

                //   //window.location.href = "/#/password-reset?id="+response["id"];


                // }
                // else{
                //   this.auth = response;
                //   window.location.href = "/#/";
                // }
                // console.log("Res:" + this.auth.jwToken)
                // //console.log("Complete Task Response = " + response);
              },
              err => {
                if (err.status == 400) alert('Incorrect Username or Password');
                else console.log(err);
              }
            );

        if (this.loginForm.valid) {
          try {
            //this.mersetaservice.login();
            // this.spinner.show();
            // this.loginForm
            //   .get('deviceID')
            //   .patchValue(this.deviceService.getDeviceInfo().userAgent);
            // this.accountService.login(this.loginForm.value).subscribe(
            //   (token) => {
            //     const user = this.shared.deserialiseToken(token);
            //     this.accountService.saveToken(token);
            //     const userState: AccountStateModel = {
            //       user,
            //       isLoggedIn: true,
            //       token,
            //     };
            //     this.store.dispatch(new LoadAuthState(userState));
            //     this.spinner.hide();
            //   },
            //   (error) => {
            //     this.spinner.hide();
            //     this.shared.showNotification(
            //       'error',
            //       this.shared.getFieldValueFromObject(error, 'error', error)
            //     );
            //   }
            // );

          } catch (error) {
            // this.spinner.hide();
            // this.shared.showNotification('error', 'Unable to login');
          }
        } else {
        //   this.shared.showNotification(
        //     'error',
        //     'Please provide all the required fields'
        //   );
        }
      }



}


