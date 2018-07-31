import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Charity } from '../shared/charity';
import { Comment } from '../shared/comment';
import { HttpClient } from '@angular/common/http';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { Restangular } from 'ngx-restangular';
import { baseURL } from '../shared/baseurl';
import { MapResponse } from '../utils/helpers';
import { mergeMap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class GetCharitiesService {

  constructor(private restangular: Restangular,
    private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }

  getChairties(page: number): Observable<any> {
    return this.http.get<any>(baseURL + 'charities?page=' + page)
      .catch(err => this.processHTTPMsgService.handleError(err));

  };
  getAllCharities():Observable<any> {
       return this.http.get<any>(baseURL +'charities/allcharities')
       .catch(err => this.processHTTPMsgService.handleError(err));
 }
  getNewestCharities(): Observable<Charity[]> {
    return this.restangular.all('charities/newCharities').getList();
  }
  getCharity(id: string): Observable<Charity> {
    return this.restangular.one('charities', id).get();
  }
  postComment(charityId: string, comment: any): Observable<Comment[]> {
    return this.http.post<Comment[]>(baseURL + 'charities/' + charityId + "/comments", comment)
      .catch(err => this.processHTTPMsgService.handleError(err));
  }
  getCharityByCategory(categoryId: string, page: number): Observable<any> {
    return this.http.get(baseURL + 'categories/' + categoryId + '?page=' + page)
      .catch(err => this.processHTTPMsgService.handleError(err));
  }
  getGeocode(geoAddress: string): Observable<any> {
       return this.http.get<MapResponse>('https://maps.googleapis.com/maps/api/geocode/json?address=' + geoAddress);
 }
  changeGeocoding(charityId: string, geoRes: MapResponse): Observable<any> {
    let geocode = geoRes.results[0].geometry.location;
    return this.http.put(baseURL + 'charities/'+charityId + '/geocode', geocode)
  }
}
