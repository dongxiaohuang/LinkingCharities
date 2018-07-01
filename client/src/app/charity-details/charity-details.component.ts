import { Component, OnInit } from '@angular/core';
import { GetCharitiesService } from '../services/get-charities.service';
import { Charity } from '../shared/charity';
import { Params, ActivatedRoute } from '@angular/router';
import { baseURL } from '../shared/baseurl';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-charity-details',
  templateUrl: './charity-details.component.html',
  styleUrls: ['./charity-details.component.scss'],
  providers: [NgbRatingConfig] // add NgbRatingConfig to the component providers
})
export class CharityDetailsComponent implements OnInit {

  charity: Charity;
  currentRate: number = 4;
  baseUrl: string = baseURL;
  constructor(private charityService: GetCharitiesService,
    private route: ActivatedRoute,
     config: NgbRatingConfig) {
          config.max = 5;
     }

  ngOnInit() {
    let id = this.route.snapshot.params['id']; //'+' convert a string into interger value
    this.charityService.getCharity(id)
      .subscribe(charity => this.charity = charity);
  }
  selected = 0;

}
