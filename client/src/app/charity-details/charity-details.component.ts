import { Component, OnInit } from '@angular/core';
import { GetCharitiesService } from '../services/get-charities.service';
import { Charity } from '../shared/charity';
import { Params, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-charity-details',
  templateUrl: './charity-details.component.html',
  styleUrls: ['./charity-details.component.scss']
})
export class CharityDetailsComponent implements OnInit {

  charity: Charity;
  constructor(private charityService: GetCharitiesService,
       private route: ActivatedRoute) { }

  ngOnInit() {
       let id = +this.route.snapshot.params['id']; //'+' convert a string into interger value
       this.charityService.getCharity(id)
          .subscribe(charity => this.charity = charity);
  }

}
