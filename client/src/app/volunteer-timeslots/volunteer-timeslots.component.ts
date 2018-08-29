import { Component, OnInit } from '@angular/core';
import { VolunteerService } from '../services/volunteer.service';
import { Params, ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-volunteer-timeslots',
  templateUrl: './volunteer-timeslots.component.html',
  styleUrls: ['./volunteer-timeslots.component.scss']
})
export class VolunteerTimeslotsComponent implements OnInit {

  id: string;
  timeslots: any = [];
  constructor(private volunteerService: VolunteerService,
    private authService: AuthService,
    private location: Location,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id']; //'+' convert a string into interger value

    this.getTimeslots(this.id)
  }
  getTimeslots(id) {
    this.volunteerService.getTimeslots(id)
      .subscribe(
        timeslots => {
          this.timeslots = timeslots;
        }
      )
  }
  back(){
    this.location.back(); // <-- go back to previous location on cancel
 }

}
