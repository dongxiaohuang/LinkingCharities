import { Component, OnInit, Input } from '@angular/core';

import { Charity } from '../shared/charity';
import { GetCharitiesService } from '../services/get-charities.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.scss']
})
export class DiscoverComponent implements OnInit {

  @Input()
  charities;
  numberPerPage: number;
  key: string = "name";
  reverse: boolean = false;
  myfilter: any;
  isCollapsed: boolean = true;
  totalPage: number;
  totalNumber: number;
  //initializing p to one
  page: number = 1;
  advancedFilter: any = {
    location: [],
    rating: [],
    categories: [],
  }

  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }
  constructor(private charityService: GetCharitiesService,
    private router: Router) {

  }

  get lower() {
    return 1 + (this.page - 1) * this.numberPerPage;
  }
  get upper() {
    return Math.min(this.totalNumber, this.page * this.numberPerPage);
  }



  onSearch(params: string) {
    console.log(params);
  }
  ngOnInit() {
    this.getCharities(this.page);
  }

  getCharities(page: number) {
    this.charityService.getChairties(this.page - 1)
      .subscribe(
        charities => {
          this.charities = charities.charities;
          this.totalPage = charities.pages;
          this.numberPerPage = charities.numberPerPage,
            this.totalNumber = charities.totalNumber
        }
      )
  }

  // allUK(): void {
  //   this.advancedFilter.location = ['UK']
  // }
  clear(): void {
    this.advancedFilter.location = [];
    this.advancedFilter.rating = [];
    this.advancedFilter.categories = [];
  }

  checkValue(isChecked: boolean, val: any) {
    if (this.advancedFilter.location.includes(val) && !isChecked) {
      let index = this.advancedFilter.location.indexOf(val);
      if (index > -1)
        this.advancedFilter.location.splice(index, 1);

    }
    if (!this.advancedFilter.location.includes(val) && isChecked) {
      this.advancedFilter.location.push(val);
    }
  }
  checkCategories(isChecked: boolean, val: any) {
    if (this.advancedFilter.categories.includes(val) && !isChecked) {
      let index = this.advancedFilter.categories.indexOf(val);
      if (index > -1)
        this.advancedFilter.categories.splice(index, 1);

    }
    if (!this.advancedFilter.categories.includes(val) && isChecked) {
      this.advancedFilter.categories.push(val);
    }
  }
  checkRating(isChecked: boolean, val: any) {
    if (this.advancedFilter.rating.includes(val) && !isChecked) {
      let index = this.advancedFilter.rating.indexOf(val);
      if (index > -1)
        this.advancedFilter.rating.splice(index, 1);

    }
    if (!this.advancedFilter.rating.includes(val) && isChecked) {
      this.advancedFilter.rating.push(val);
    }
  }

}
