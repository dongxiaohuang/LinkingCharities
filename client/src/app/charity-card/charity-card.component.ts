import { Component, OnInit, Input } from '@angular/core';
import { Charity } from '../shared/charity';
import { baseURL } from '../shared/baseurl';
import { FavoriteService } from '../services/favorite.service';
import { Router } from '@angular/router';
import * as $ from 'jquery';


@Component({
  selector: 'app-charity-card',
  templateUrl: './charity-card.component.html',
  styleUrls: ['./charity-card.component.scss']
})
export class CharityCardComponent implements OnInit {
  @Input()
  charity: Charity;

  baseUrl = baseURL;

  constructor( private favoriteService: FavoriteService,
   private router: Router) { }

  ngOnInit() {
  }
  display(classId: string){$('.'+classId).slideToggle('slow');}
  getUrl(img):string{
       return "url("+this.baseUrl+img+") center/cover no-repeat";
 }

}
