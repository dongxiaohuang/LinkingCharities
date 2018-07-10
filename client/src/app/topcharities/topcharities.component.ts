import { Component, OnInit, Input } from '@angular/core';
import { Charity } from '../shared/charity';
import { baseURL } from '../shared/baseurl';
import { FavoriteService } from '../services/favorite.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-topcharities',
  templateUrl: './topcharities.component.html',
  styleUrls: ['./topcharities.component.scss']
})
export class TopcharitiesComponent implements OnInit {
  baseUrl = baseURL;
  favorite = true;
  @Input()
  charities: Charity[];
  constructor(
       private favoriteService: FavoriteService
 ) { }

  ngOnInit() {
      // this.charityService.getChairties()
      //     .subscribe(charities => this.charities = charities);
  }
  display(classId: string){$('.'+classId).slideToggle('slow');}
  getUrl(img):string{
       return "url("+this.baseUrl+img+") center/cover no-repeat";
 }
 //  isFavorite(charityId: string): boolean{
 //       let _isFavorite: boolean;
 //       this.favoriteService.isFavorite(charityId)
 //          .subscribe(
 //               resp => {console.log(resp);
 //                    _isFavorite = resp.exists;},
 //                err => console.log(err)
 //          );
 //     return _isFavorite;
 // }
 //  toggleFavorite(charityId: string){
 //       if(this.isFavorite(charityId)){
 //            this.favoriteService.deleteFavorite(charityId)
 //               .subscribe(fav => {
 //                    console.log("remove from favorites", fav);
 //               }, err => console.log(err));
 //       }else{
 //            this.favoriteService.postFavorite(charityId)
 //               .subscribe(fav => {
 //                    console.log("add to favorites",fav)
 //               },  err => console.log(err));
 //       }
 // }
}
