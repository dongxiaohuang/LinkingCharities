import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { baseURL } from '../shared/baseurl';

@Injectable({
  providedIn: 'root'
})
export class VolunteerService {

  constructor(private http: HttpClient,
  private processHTTPMsgService: ProcessHTTPMsgService) { }

  postVolunteer(activity): Observable<any>{
       return this.http.post(baseURL +'volunteer', activity)
       .catch(err => this.processHTTPMsgService.handleError(err));
 }
}
