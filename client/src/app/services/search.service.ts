import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { Observable } from 'rxjs';
import { baseURL } from '../shared/baseurl';
@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient,
  private processHTTPMsgService: ProcessHTTPMsgService) { }

  getSearchResults(query: string, page: number): Observable<any> {
       return this.http.get(baseURL + 'search?q=' + query+ '&page='+page)
          .catch(err => this.processHTTPMsgService.handleError(err));
 }
}
