import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../services/auth.service';
import { AuthCharityService } from '../services/auth-charity.service';
import {
    AuthService as FacebookAuthService,
    FacebookLoginProvider,
    GoogleLoginProvider
} from 'angular5-social-login';
import * as $ from 'jquery';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  modalReference: NgbModalRef;
  user = { username: '', password: '', remember: false };
  charity = { username: '', password: '', remember: false };
  errMsg: string;
  res;
  constructor(
    private modalService: NgbModal,
    private authService: AuthService,
    private socialAuthService: FacebookAuthService,
    private authCharityService: AuthCharityService) {
    }

  openVerticallyCentered(content) {
    this.modalReference = this.modalService.open(content, { centered: true });
  }
  ngOnInit() {
  }

  onUserSubmit() {
    console.log("User: ", this.user);
    this.authService.logIn(this.user)
      .subscribe(res => {
           this.res = res;
        if (res.success) {
          // this.dialogRef.close(res.success);
          this.modalReference.dismiss();

        }
        else {
          console.log(res);
          this.errMsg = res.err.message;
        }
      },
        error => {
          console.log(error);
          this.errMsg = error;
        })
  };

  onCharitySubmit(){
       console.log('Charity User', this.charity);
       this.authCharityService.logIn(this.charity)
          .subscribe(res => {
               if(res.success){
                    this.modalReference.dismiss();
               }else{
                    console.log(res);
                    this.errMsg = res.err.message;
               }
          },error => {
           console.log(error);
           this.errMsg = error;
         })
 }
 public socialSignIn(socialPlatform : string) {
 let socialPlatformProvider;
    socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
 this.socialAuthService.signIn(socialPlatformProvider).then(
    (userData) => {
      console.log(userData.token);
      // Now sign-in with userData
      this.authService.facebookLogIn(userData)
          .subscribe(res => {
               if(res.success){
                    this.modalReference.dismiss();
               }else{
                    console.log(res);
                    this.errMsg = res.err.message;
               }
          },error => {
           console.log(error);
           this.errMsg = error;
         })
    }
 );
}


}
