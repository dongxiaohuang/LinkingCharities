import { Component, OnInit } from '@angular/core';
import { GetCharitiesService } from '../services/get-charities.service';
import { Charity } from '../shared/charity';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  charities: Charity[];
  constructor(
    private charityService: GetCharitiesService
  ) { }

  ngOnInit() {
    this.charityService.getChairties()
      .subscribe(charities => this.charities = charities);
  }
}
