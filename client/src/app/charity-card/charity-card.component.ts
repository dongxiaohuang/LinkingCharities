import { Component, OnInit, Input } from '@angular/core';
import { Charity } from '../shared/charity';
import { baseURL } from '../shared/baseurl';
import { FavoriteService } from '../services/favorite.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import * as $ from 'jquery';


@Component({
  selector: 'app-charity-card',
  templateUrl: './charity-card.component.html',
  styleUrls: ['./charity-card.component.scss']
})
export class CharityCardComponent implements OnInit {
  @Input()
  charity: Charity;
  isLoggedIn;
  alertMsg: string = undefined;


  baseUrl = baseURL;
  isFavorite: boolean = false;
  constructor(private favoriteService: FavoriteService,
       private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
       this.isLoggedIn = this.authService.isLoggedIn();
       if(this.isLoggedIn){
            this.favoriteService.isFavorite(this.charity._id)
            .subscribe(fav => {
                 console.log(fav);
                 this.isFavorite = fav.exists;
            });
       }
  }
  display(classId: string) { $('.' + classId).slideToggle('slow'); }
  getUrl(img): string {
    return "url(" + this.baseUrl + img + ") center/cover no-repeat";
  }

  toggleFavorite() {
       if(this.isLoggedIn){
            if (this.isFavorite) {
                 this.favoriteService.deleteFavorite(this.charity._id)
                 .subscribe(resp => {
                     console.log(resp);
                     this.isFavorite = false;
                 }, err => console.log(err));
            } else {
                 this.favoriteService.postFavorite(this.charity._id)
                 .subscribe(resp => {
                     console.log(resp);
                     this.isFavorite = true;
                 }, err => console.log(err));
            }
       }else{
            this.alertMsg = "Please log in as a user!"
       }
  }

}
