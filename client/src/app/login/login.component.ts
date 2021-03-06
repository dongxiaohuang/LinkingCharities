import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../services/auth.service';
import { AuthCharityService } from '../services/auth-charity.service';
import {
  AuthService as FacebookAuthService,
  FacebookLoginProvider,
  GoogleLoginProvider
} from 'angular5-social-login';
import * as $ from 'jquery';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  modalReference: NgbModalRef;
  user = { username: '', password: '', remember: false };
  charity = { username: '', password: '', remember: false };
  errMsg: string = undefined;
  constructor(
    private modalService: NgbModal,
    public activeModal: NgbActiveModal,
    private authService: AuthService,
    private router: Router,
    private socialAuthService: FacebookAuthService,
    private authCharityService: AuthCharityService) {
  }

  // openVerticallyCentered(content) {
  //   this.modalReference = this.modalService.open(content, { centered: true });
  // }
  ngOnInit() {
  }

  onUserSubmit() {
    if (this.authCharityService.isLoggedIn()) {
      this.authCharityService.logOut();
    }
    this.authService.logIn(this.user)
      .subscribe(res => {
        if (res.success) {
          // this.dialogRef.close(res.success);
          this.onRefresh();
          this.activeModal.dismiss('Cross click');
        }
        else {
          console.log(res);
          this.errMsg = res.err;
        }
      },
        error => {
          console.log(error);
          this.errMsg = error;
        })
  };

  onCharitySubmit() {
    console.log('Charity User', this.charity);
    this.authCharityService.logIn(this.charity)
      .subscribe(res => {
        if (res.success) {
          // this.modalReference.dismiss();
          this.onRefresh();
          this.activeModal.dismiss('Cross click');
        } else {
          this.errMsg = res.err.message;
        }
      }, error => {
        console.log(error);
        this.errMsg = error;
      })
  }
  public socialSignIn(socialPlatform: string) {
    let socialPlatformProvider;
    socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    if(this.authCharityService.isLoggedIn()){
         this.authCharityService.logOut();
    }
    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        console.log(userData);
        // Now sign-in with userData
        this.authService.facebookLogIn(userData)
          .subscribe(res => {
            if (res.success) {
              this.onRefresh();
              this.activeModal.dismiss('Cross click');

            } else {
              console.log(res);
              this.errMsg = res.err.message;
            }
          }, error => {
            console.log(error);
            this.errMsg = error;
          })
      }
    );
  }

// refresh the current page
  onRefresh() {
  this.router.routeReuseStrategy.shouldReuseRoute = function(){return false;};

  let currentUrl = this.router.url + '?';

  this.router.navigateByUrl(currentUrl)
    .then(() => {
      this.router.navigated = false;
      this.router.navigate([this.router.url]);
    });
  }


}
