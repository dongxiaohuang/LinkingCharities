import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { VolunteerService } from '../services/volunteer.service';
import { AuthService } from '../services/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../login/login.component';
@Component({
  selector: 'app-volunteer-details',
  templateUrl: './volunteer-details.component.html',
  styleUrls: ['./volunteer-details.component.scss']
})
export class VolunteerDetailsComponent implements OnInit {

  id: string;
  activity;
  isLoginIn:Boolean;
  constructor(
    private route: ActivatedRoute,
    private volunteerService: VolunteerService,
    private authService: AuthService,
    private modalService: NgbModal,
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id']; //'+' convert a string into interger value
    this.isLoginIn = this.authService.isLoggedIn();
    this.volunteerService.getVolunteer(this.id)
     .subscribe(
          volunteer => {
               this.activity = volunteer
          }
     )
  }
  OpenLogin(){
       this.isLoginIn = this.authService.isLoggedIn();
       if(!this.isLoginIn){
            const modalRef = this.modalService.open(LoginComponent, { centered: true });
       }
 }
}
