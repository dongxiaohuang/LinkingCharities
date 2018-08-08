import { Component, OnInit } from '@angular/core';
import { VolunteerService } from '../services/volunteer.service';
import { Params, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-volunteer-timeslots',
  templateUrl: './volunteer-timeslots.component.html',
  styleUrls: ['./volunteer-timeslots.component.scss']
})
export class VolunteerTimeslotsComponent implements OnInit {

  id: string;
  timeslots: any = [];
  constructor(private volunteerService: VolunteerService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id']; //'+' convert a string into interger value

    this.volunteerService.getTimeslots(this.id)
      .subscribe(
        timeslots => {
          this.timeslots = timeslots;
        }
      )
  }

}
