import { Component, OnInit, HostListener } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AuthCharityService } from '../services/auth-charity.service';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../login/login.component';
import { Subscription } from 'rxjs/Subscription';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import * as $ from 'jquery';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [NgbDropdownConfig] // add NgbDropdownConfig to the component providers
})
export class HeaderComponent implements OnInit {

  public isCollapsed = true;
  subscriptionUser: Subscription;
  subscriptionCharity: Subscription;
  username: string = undefined;
  charityUsername: string = undefined;

  constructor(private modalService: NgbModal,
    private authService: AuthService,
    private authCharityService: AuthCharityService,
    private config: NgbDropdownConfig,
    private router: Router) { this.config.placement = 'bottom-right'; }

  ngOnInit() {
    this.authService.loadUserCredentials();
    this.subscriptionUser = this.authService.getUsername()
      .subscribe(name => { console.log(name); this.username = name; });
    this.authCharityService.loadCharityCredentials();
    this.subscriptionCharity = this.authCharityService.getUsername()
      .subscribe(name => { console.log(name); this.charityUsername = name; });
  }

  ngOnDestroy() {
    this.subscriptionUser.unsubscribe();
    this.subscriptionCharity.unsubscribe();
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
    this.charityUsername = undefined;
    this.authCharityService.logOut();
    this.router.navigate(['/']);
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
