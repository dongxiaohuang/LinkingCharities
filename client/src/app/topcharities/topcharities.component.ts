import { Component, OnInit } from '@angular/core';
import { GetCharitiesService } from '../services/get-charities.service';
import { Charity } from '../shared/charity';
import { baseURL } from '../shared/baseurl';
import * as $ from 'jquery';

@Component({
  selector: 'app-topcharities',
  templateUrl: './topcharities.component.html',
  styleUrls: ['./topcharities.component.scss']
})
export class TopcharitiesComponent implements OnInit {
  baseUrl = baseURL;
  charities: Charity[];
  constructor(private charityService: GetCharitiesService) { }

  ngOnInit() {
      this.charityService.getChairties()
          .subscribe(charities => this.charities = charities);
  }
  display(classId: string){$('.'+classId).slideToggle('slow');}
}
