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
  favorite = {};
  @Input()
  charities: Charity[];
  constructor(
       private favoriteService: FavoriteService
 ) { }
  ngOnInit() {
       // console.log(this.charities);
       // for(let charity in this.charities){
       //      let id = charity._id;
       //      console.log(id);
       //      this.favoriteService.isFavorite(charity._id)
       //         .subscribe(resp => {
       //              console.log(resp);
       //              this.favorite.id = resp.exists;
       //         }, err => console.log(err))
       // }
  }

  display(classId: string){$('.'+classId).slideToggle('slow');}
  getUrl(img):string{
       return "url("+this.baseUrl+img+") center/cover no-repeat";
 }


}
