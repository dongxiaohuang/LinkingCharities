import { Component, OnInit } from '@angular/core';
import { GetCharitiesService } from '../services/get-charities.service';
import { FavoriteService } from '../services/favorite.service';
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
  favorite: boolean;
  id: string;
  constructor(private charityService: GetCharitiesService,
       private favoriteService: FavoriteService,
    private route: ActivatedRoute,
     config: NgbRatingConfig) {
          config.max = 5;
     }

  ngOnInit() {
    this.id = this.route.snapshot.params['id']; //'+' convert a string into interger value
    this.charityService.getCharity(this.id)
      .subscribe(charity => this.charity = charity);
    this.favoriteService.isFavorite(this.id)
      .subscribe(fav => {
           console.log(fav);
           this.favorite = fav.exists;
      })
  }

  toggleFavorite(){
       if(this.favorite){
            this.favoriteService.deleteFavorite(this.id)
               .subscribe(resp => {
                    console.log(resp);
                    this.favorite = false;
               }, err => console.log(err));
       }else{
            this.favoriteService.postFavorite(this.id)
               .subscribe(resp => {
                    console.log(resp);
                    this.favorite = true;
               }, err=> console.log(err));
       }
 }
  selected = 0;

}
