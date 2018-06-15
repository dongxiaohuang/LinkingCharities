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
  filteredCharities: Charity[];
  key: string = "name";
  reverse: boolean = false;
  myfilter:any ;

  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }
  constructor(private charityService: GetCharitiesService) { }

  //initializing p to one
  p: number = 1;
  ngOnInit() {
    this.getAll();
  }
  getAll(): void {
    this.charities = this.charityService.getChairties();
    this.filteredCharities = this.charities;
  }
  allUK(): void {
    this.filteredCharities = this.filteredCharities.filter(
      charity => charity.location == 'UK'
    )
    // myfilter = 'UK';
  }
  animals():void {
       this.filteredCharities = this.filteredCharities.filter(
            charity => charity.label.includes('animals')
       )
 }
  rating(num: number):void {
       this.filteredCharities = this.filteredCharities.filter(
           (charity) => {
                return charity.rating === num;
           }
       )
 }


}
