import { Component, OnInit } from '@angular/core';
import { Favorite } from '../shared/favorite';
import { FavoriteService } from '../services/favorite.service';
import { ProcessHTTPMsgService } from '../services/process-httpmsg.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  favorite: Favorite;
  constructor(private favoriteService: FavoriteService,
       private processHTTPMsgService: ProcessHTTPMsgService) {
 }

  ngOnInit() {
       this.favoriteService.getFavorites()
          .subscribe(resp => {
               this.favorite = resp;
          }, err => {
               this.processHTTPMsgService.handleError(err);
          })
  }

}
