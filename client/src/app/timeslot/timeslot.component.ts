import { Component, OnInit, Input } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../services/auth.service';
import { VolunteerService } from '../services/volunteer.service';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-timeslot',
  templateUrl: './timeslot.component.html',
  styleUrls: ['./timeslot.component.scss']
})
export class TimeslotComponent implements OnInit {

  @Input()
  timeslot
  @Input()
  volunteerId

  isLoginIn: Boolean = false;
  isRegistered = false;
  constructor(
    private modalService: NgbModal,
    private authService: AuthService,
    private volunteerService: VolunteerService,
  ) { }

  ngOnInit() {
    this.isLoginIn = this.authService.isLoggedIn();
    if (this.isLoginIn) {
      this.volunteerService.isRegistered(this.volunteerId, this.timeslot._id)
        .subscribe(res => {
          this.isRegistered = res.exists;
        })
    }
  }

  isValid() {
    return this.timeslot.registers_no < this.timeslot.requiredNumber;
  }
  toggleRegister() {

    //check if login
    let isLoggedIn = this.authService.isLoggedIn();
    if (!isLoggedIn) {
      const modalRef = this.modalService.open(LoginComponent, { centered: true });
    } else {
      //check if isRegistered
      if(!this.isRegistered){

           this.volunteerService.registerToVol(this.volunteerId, this.timeslot._id)
           .pipe(
                mergeMap(res => {
                     if (res.success) {
                          this.isRegistered = true;
                     }
                     return  this.volunteerService.getTimeslot(this.volunteerId, this.timeslot._id);
                })
           )
           .subscribe(timeslot => {
                console.log(timeslot)
                     this.timeslot = timeslot;
           });
      }else{
           this.volunteerService.unregisterToVol(this.volunteerId, this.timeslot._id)
           .pipe(
                mergeMap(res => {
                     if (res.success) {
                          this.isRegistered = false;
                     }
                     return  this.volunteerService.getTimeslot(this.volunteerId, this.timeslot._id);
                })
           )
           .subscribe(timeslot => {
                     this.timeslot = timeslot;
           });
      }
    }
  }
}
