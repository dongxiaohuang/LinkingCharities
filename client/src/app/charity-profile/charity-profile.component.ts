import { Component, OnInit } from '@angular/core';
import { AuthCharityService } from '../services/auth-charity.service';
import { baseURL } from '../shared/baseurl';
@Component({
  selector: 'app-charity-profile',
  templateUrl: './charity-profile.component.html',
  styleUrls: ['./charity-profile.component.scss']
})
export class CharityProfileComponent implements OnInit {
  baseUrl = baseURL;
  constructor(private authCharityService:AuthCharityService) { }
  profile;
  ngOnInit() {
       this.authCharityService.getProfile()
          .subscribe(
               profile =>
               this.profile =profile
          );
  }

}
