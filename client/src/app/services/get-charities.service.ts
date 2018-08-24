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
import { googleAPI } from '../config';
import { HttpHeaders } from '@angular/common/http';
import { InterceptorSkipHeader } from './auth.interceptor';

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
  deleteCharity(charityId:string): Observable<any> {
       return this.http.delete(baseURL + '/charities/'+charityId)
       .catch(err => this.processHTTPMsgService.handleError(err));
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
       let headers = new HttpHeaders().set(InterceptorSkipHeader, '');
       // headers = headers.set('Content-Type', 'application/json; charset=utf-8');
       return this.http.get<MapResponse>('https://maps.googleapis.com/maps/api/geocode/json?address=' + geoAddress, {headers:headers})
       .catch(err => this.processHTTPMsgService.handleError(err));

 }
  changeGeocoding(charityId: string, geoRes: MapResponse): Observable<any> {
       let geocode;
       if(geoRes.results){
            geocode = geoRes.results[0].geometry.location;
       }else{
            geocode = {
            "lat":"" ,
            "lng":""
        };
       }
    return this.http.put(baseURL + 'charities/'+charityId + '/geocode', geocode)
    .catch(err => this.processHTTPMsgService.handleError(err));

  }

  getAverageRating(charityId): Observable<any> {
       // https://localhost:8443/rating/5b71dd55e4cc047b0d430051/averageRating
       return this.http.get(baseURL + 'rating/'+charityId + '/averageRating')
       .catch(err => this.processHTTPMsgService.handleError(err));
 }
  hasRate(charityId):Observable<any> {
       // https://localhost:8443/rating/5b71dd55e4cc047b0d430051/averageRating
       return this.http.get(baseURL + 'rating/'+charityId )
       .catch(err => this.processHTTPMsgService.handleError(err));
 }
  postRating(charityId, rating):Observable<any> {
       // https://localhost:8443/rating/5b71dd55e4cc047b0d430051/averageRating
       return this.http.post(baseURL + 'rating/'+charityId , rating)
       .catch(err => this.processHTTPMsgService.handleError(err));
 }
 getCharityByCCN(regno:number): Observable<any> {
      return this.http.get(baseURL + 'charities/ccn/'+regno)
      .catch(err => this.processHTTPMsgService.handleError(err));
}
}
