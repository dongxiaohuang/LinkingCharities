import { Component, OnInit } from '@angular/core';

import { Charity } from '../shared/charity';
import { baseURL } from '../shared/baseurl';
import { GetCharitiesService } from '../services/get-charities.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.scss']
})
export class DiscoverComponent implements OnInit {
  baseUrl = baseURL;
  charities: Charity[];
  searchKey:string;
  key: string = "name";
  reverse: boolean = false;
  myfilter: any;
  isCollapsed: boolean = true;
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
               private router: Router,
               private activatedRoute: ActivatedRoute) {
                    this.activatedRoute.params.subscribe(
                         params => {
                              if(params['key']){
                                   this.onSearch(params.key);
                                   this.searchKey = params['key'];
                              }
                         }
                    )
 }

  //initializing p to one
  p: number = 1;

  onSearch(params: string){
       console.log(params);
 }
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
