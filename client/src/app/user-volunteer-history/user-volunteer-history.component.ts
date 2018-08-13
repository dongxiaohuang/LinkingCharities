import { Component, OnInit } from '@angular/core';
import { VolunteerService } from '../services/volunteer.service';
@Component({
  selector: 'app-user-volunteer-history',
  templateUrl: './user-volunteer-history.component.html',
  styleUrls: ['./user-volunteer-history.component.scss']
})
export class UserVolunteerHistoryComponent implements OnInit {

  constructor(private volunteerService: VolunteerService) { }
  timeslots;
  ngOnInit() {
       this.volunteerService.getRegistedTimeslots()
          .subscribe(res =>
          this.timeslots = res )
  }

}
