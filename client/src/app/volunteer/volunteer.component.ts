import { Component, OnInit } from '@angular/core';
import { NgbDateAdapter, NgbDateStruct, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { VolunteerService } from '../services/volunteer.service';
@Component({
  selector: 'app-volunteer',
  templateUrl: './volunteer.component.html',
  styleUrls: ['./volunteer.component.scss'],
})
export class VolunteerComponent implements OnInit {
  totalAmount: any;
  perPage: any;
  volunteerActivies;
  page: number = 0;
  totalNumber: number;
  date;
  constructor(private volunteerService: VolunteerService) { }
  ngOnInit(): void {
    this.getVolunteers(this.page, '','','')
  }

  getVolunteers(page, year, month, day) {
    this.volunteerService.getVolunteers(page, year, month, day)
      .subscribe(res => {
        if (res.success) {
          this.volunteerActivies = res.volunteers;
          this.perPage = res.numberPerPage,
            this.totalNumber = res.totalNumber,
            this.totalAmount = res.totalNumber;
        }
      })

  }
  get today() {
   const now = new Date();
   return { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() };
  }

  get lower() {
    return 1 + (this.page - 1) * this.perPage;
  }
  get upper() {
    return Math.min(this.totalNumber, (this.page + 1) * this.perPage);
  }

  allVolunteer(){
       this.getVolunteers(this.page-1,'','','')
 }
 chooseDate(){
      // this.date = this.date.toJSON();
      this.getVolunteers(this.page-1, this.date.year, this.date.month, this.date.day)
}
}
