import { Component, OnInit } from '@angular/core';

import { Charity } from '../shared/charity';
import { baseURL } from '../shared/baseurl';
import { GetCharitiesService } from '../services/get-charities.service';
@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.scss']
})
export class DiscoverComponent implements OnInit {
  baseUrl = baseURL;
  charities: Charity[];
  key: string = "name";
  reverse: boolean = false;
  myfilter: any;

  advancedFilter: any = {
    location: [],
    rating: [],
    categories: [],
  }

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
    this.charityService.getChairties()
     .subscribe( charities => this.charities = charities);
  }
  // allUK(): void {
  //   this.advancedFilter.location = ['UK']
  // }
  clear(): void {
    this.advancedFilter.location = [];
    this.advancedFilter.rating = [];
    this.advancedFilter.categories = [];
 }

  checkValue(isChecked: boolean, val: any){
    if(this.advancedFilter.location.includes(val) && !isChecked){
         let index = this.advancedFilter.location.indexOf(val);
         if(index > -1)
          this.advancedFilter.location.splice(index, 1);

    }
    if(!this.advancedFilter.location.includes(val) && isChecked){
         this.advancedFilter.location.push(val);
    }
  }
  checkCategories(isChecked: boolean, val: any){
    if(this.advancedFilter.categories.includes(val) && !isChecked){
         let index = this.advancedFilter.categories.indexOf(val);
         if(index > -1)
          this.advancedFilter.categories.splice(index, 1);

    }
    if(!this.advancedFilter.categories.includes(val) && isChecked){
         this.advancedFilter.categories.push(val);
    }
  }
  checkRating(isChecked: boolean, val: any){
    if(this.advancedFilter.rating.includes(val) && !isChecked){
         let index = this.advancedFilter.rating.indexOf(val);
         if(index > -1)
          this.advancedFilter.rating.splice(index, 1);

    }
    if(!this.advancedFilter.rating.includes(val) && isChecked){
         this.advancedFilter.rating.push(val);
    }
  }

}
