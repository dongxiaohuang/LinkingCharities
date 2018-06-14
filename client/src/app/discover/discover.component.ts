import { Component, OnInit } from '@angular/core';

import { Charity } from '../shared/charity';
import { GetCharitiesService } from '../services/get-charities.service';
@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.scss']
})
export class DiscoverComponent implements OnInit {

  charities: Charity[];
  key: string = "name";
  reverse: boolean = false;
  sort(key){
       this.key = key;
       this.reverse = !this.reverse;
 }
  constructor(private charityService: GetCharitiesService) { }

  //initializing p to one
  p: number = 1;
  ngOnInit() {
       this.charities = this.charityService.getChairties();
  }

}
