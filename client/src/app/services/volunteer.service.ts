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

  postVolunteer(activity): Observable<any> {
    return this.http.post(baseURL + 'volunteer', activity)
      .catch(err => this.processHTTPMsgService.handleError(err));
  }
  getVolunteers(page: number, year, month, day): Observable<any> {
       if(year && month && day){
            return this.http.get(baseURL + 'volunteer?page=' + page+
            '&year='+year+
            '&month='+month+
            '&day='+day)
            .catch(err => this.processHTTPMsgService.handleError(err));

       }else{
            return this.http.get(baseURL + 'volunteer?page=' + page+'?page=' + page)
            .catch(err => this.processHTTPMsgService.handleError(err));
       }
  }
  getVolunteerForCharity(charityId:string, page:number):Observable<any> {
    return this.http.get(baseURL + 'volunteer/charity/'+charityId)
      .catch(err => this.processHTTPMsgService.handleError(err));
  }
  getVolunteer(volunteerId:string): Observable<any>{
       return this.http.get(baseURL + 'volunteer/'+volunteerId)
       .catch(err => this.processHTTPMsgService.handleError(err));
 }
  getTimeslots(volunteerId:string):Observable<any>{
       //https://localhost:8443/volunteer/5b6ac594c0176dc9f234d4d4/timeslots
       return this.http.get(baseURL + 'volunteer/'+volunteerId+'/timeslots')
       .catch(err => this.processHTTPMsgService.handleError(err));
 }


}
