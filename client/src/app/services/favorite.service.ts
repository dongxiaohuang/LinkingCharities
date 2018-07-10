import { Injectable } from '@angular/core';
import { Favorite } from '../shared/favorite';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';


// interface isFavResponse {
//   exists: boolean,
//   favorites: any
// };
@Injectable()
export class FavoriteService {

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }


  getFavorites(): Observable<any> {
    return this.http.get(baseURL + 'favorites')
      .catch(error => { return this.processHTTPMsgService.handleError(error); });
  }

  postFavorite(charityID: any) {
       return this.http.post(baseURL +'favorites/'+charityID,{})
       .catch(err => this.processHTTPMsgService.handleError(err));
 }
  isFavorite(charityID: any){
       return this.http.get(baseURL + 'favorites/' + charityID)
       .catch(err => this.processHTTPMsgService.handleError(err));
 }
 deleteFavorite(charityID: any){
      return this.http.delete(baseURL + 'favorites/' + charityID)
      .catch(err => this.processHTTPMsgService.handleError(err));
}

}
