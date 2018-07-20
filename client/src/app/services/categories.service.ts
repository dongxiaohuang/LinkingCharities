import { Injectable } from '@angular/core';
import { Category } from '../shared/category';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { baseURL } from '../shared/baseurl';


@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }

  getCategories(): Observable<any> {
    return this.http.get(baseURL + 'categories')
      .catch(err => this.processHTTPMsgService.handleError(err));
  }
}
