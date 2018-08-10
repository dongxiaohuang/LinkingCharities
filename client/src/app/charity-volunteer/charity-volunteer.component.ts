import { Component, OnInit, Input } from '@angular/core';
import { VolunteerService } from '../services/volunteer.service';
@Component({
  selector: 'app-charity-volunteer',
  templateUrl: './charity-volunteer.component.html',
  styleUrls: ['./charity-volunteer.component.scss']
})
export class CharityVolunteerComponent implements OnInit {

@Input()
charityId;

page: number=0;
charityActivities;
perPage:number;
totalNumber:number;
totalAmount:number;
  constructor(
       private volunteerService: VolunteerService
 ) { }

  ngOnInit() {
       this.getVolunteers(this.page);
 }

  getVolunteers(page: number) {
    this.volunteerService.getVolunteerForCharity(this.charityId, page)
      .subscribe(res => {
        if (res.success) {
          this.charityActivities = res.volunteers;
          this.perPage = res.numberPerPage,
            this.totalNumber = res.totalNumber,
            this.totalAmount = res.totalNumber;
        }
      })
  }

  get lower() {
    return 1 + (this.page - 1) * this.perPage;
  }
  get upper() {
    return Math.min(this.totalNumber, (this.page + 1) * this.perPage);
  }

}
