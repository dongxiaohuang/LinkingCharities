import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Charity } from '../shared/charity';
import { Comment } from '../shared/comment';
import { HttpClient } from '@angular/common/http';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { Restangular } from 'ngx-restangular';
import { baseURL } from '../shared/baseurl';


@Injectable({
  providedIn: 'root'
})
export class GetCharitiesService {

  constructor(private restangular: Restangular,
    private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }

  getChairties(page: number): Observable<any> {
    return this.http.get<any>(baseURL + 'charities?page='+ page)
    .catch(err => this.processHTTPMsgService.handleError(err));

  };
  getNewestCharities(): Observable<Charity[]> {
    return this.restangular.all('charities/newCharities').getList();
 }
  getCharity(id: string): Observable<Charity> {
    return this.restangular.one('charities', id).get();
  }
  postComment(charityId: string, comment: any): Observable<Comment[]>{
       return this.http.post<Comment[]>(baseURL+'charities/'+charityId + "/comments", comment)
          .catch(err => this.processHTTPMsgService.handleError(err));
 }
  getCharityByCategory(categoryId: string, page:number): Observable<any>{
       return this.http.get(baseURL+'categories/'+categoryId+'?page='+page)
       .catch(err => this.processHTTPMsgService.handleError(err));
 }
}
