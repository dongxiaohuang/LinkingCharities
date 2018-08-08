import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { VolunteerService } from '../services/volunteer.service';
@Component({
  selector: 'app-volunteer-details',
  templateUrl: './volunteer-details.component.html',
  styleUrls: ['./volunteer-details.component.scss']
})
export class VolunteerDetailsComponent implements OnInit {

  id: string;
  activity;
  constructor(
    private route: ActivatedRoute,
    private volunteerService: VolunteerService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id']; //'+' convert a string into interger value
    this.volunteerService.getVolunteer(this.id)
     .subscribe(
          volunteer => {
               this.activity = volunteer
          }
     )
  }

}
