import { Component, OnInit, HostListener } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../login/login.component';
import { Subscription } from 'rxjs/Subscription';

import * as $ from 'jquery';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public isCollapsed = true;
  subscription: Subscription;
  username: string = undefined;

  constructor(private modalService: NgbModal,
    private authService: AuthService) { }

  ngOnInit() {
    this.authService.loadUserCredentials();
    this.subscription = this.authService.getUsername()
      .subscribe(name => { console.log(name); this.username = name; });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  openLoginForm() {
   const modalRef = this.modalService.open(LoginComponent, { centered: true });

   // modalRef.afterClosed()
   //   .subscribe(result => {
   //     console.log(result);
   //   });
 }

 logOut() {
    this.username = undefined;
    this.authService.logOut();
  }
  // window scroll listener
  @HostListener("window:scroll", [])
  onWindowScroll() {
    const number = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (number <= 10) {
      $('.navbar').addClass("transparent");
    } else {
      $('.navbar').removeClass("transparent")
    }
  }

}
