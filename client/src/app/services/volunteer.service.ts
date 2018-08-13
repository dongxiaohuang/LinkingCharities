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
            return this.http.get(baseURL + 'volunteer?page=' + page)
            .catch(err => this.processHTTPMsgService.handleError(err));
       }
  }
  getVolunteerForCharity(charityId:string, page:number):Observable<any> {
    return this.http.get(baseURL + 'volunteer/charity/'+charityId)
      .catch(err => this.processHTTPMsgService.handleError(err));
  }
  getAllVolunteerForCharity( page:number):Observable<any> {
    return this.http.get(baseURL + 'volunteer/charity/activities/all')
      .catch(err => this.processHTTPMsgService.handleError(err));
  }
  getVolunteer(volunteerId:string): Observable<any>{
       return this.http.get(baseURL + 'volunteer/'+volunteerId)
       .catch(err => this.processHTTPMsgService.handleError(err));
 }
 changeVolunteer(volunteerId:string, newVolunteer:any): Observable<any>{
      return this.http.put(baseURL +'volunteer/'+volunteerId, newVolunteer)
     .catch(err => this.processHTTPMsgService.handleError(err));
}
 deleteVolunteer(volunteerId:string):Observable<any> {
      return this.http.delete(baseURL + 'volunteer/'+volunteerId)
      .catch(err => this.processHTTPMsgService.handleError(err));
}
  getTimeslots(volunteerId:string):Observable<any>{
       //https://localhost:8443/volunteer/5b6ac594c0176dc9f234d4d4/timeslots
       return this.http.get(baseURL + 'volunteer/'+volunteerId+'/timeslots')
       .catch(err => this.processHTTPMsgService.handleError(err));
 }
 postToTimeslots(volunteerId:string, timeslot:any):Observable<any>{
      ///:volunteerId/timeslots
      return this.http.post(baseURL + 'volunteer/'+volunteerId+'/timeslots', timeslot)
      .catch(err => this.processHTTPMsgService.handleError(err));
}

  getTimeslot(volunteerId:string, timeslotId: string):Observable<any>{
       //https://localhost:8443/volunteer/5b6ac594c0176dc9f234d4d4/timeslots
       return this.http.get(baseURL + 'volunteer/'+volunteerId+'/timeslot/'+ timeslotId)
       .catch(err => this.processHTTPMsgService.handleError(err));
 }
  changeTimeslot(volunteerId:string, timeslotId: string, newTimeslot):Observable<any>{
       //https://localhost:8443/volunteer/5b6ac594c0176dc9f234d4d4/timeslots
       return this.http.put(baseURL + 'volunteer/'+volunteerId+'/timeslot/'+ timeslotId, newTimeslot)
       .catch(err => this.processHTTPMsgService.handleError(err));
 }
  deleteTimeslot(volunteerId:string, timeslotId: string):Observable<any>{
       // /:volunteerId/timeslot/:timeslotId
       return this.http.delete(baseURL + 'volunteer/'+volunteerId+'/timeslot/'+ timeslotId)
       .catch(err => this.processHTTPMsgService.handleError(err));
 }


 isRegistered(volunteerId: string, timeslotId: string):Observable<any> {
      //https://localhost:8443/volunteer/5b6f3d713b03203e486a65f1/timeslot/5b6f3d713b03203e486a65f2/register
      return this.http.get(baseURL +'volunteer/'+volunteerId+'/timeslot/'+timeslotId+'/register')
      .catch(err => this.processHTTPMsgService.handleError(err));
}
 registerToVol(volunteerId: string, timeslotId: string):Observable<any>{
      // https://localhost:8443/volunteer/5b6f3d713b03203e486a65f1/timeslot/5b6f3d713b03203e486a65f2/register
      return this.http.post(baseURL +'volunteer/'+volunteerId+'/timeslot/'+timeslotId+'/register',{})
      .catch(err => this.processHTTPMsgService.handleError(err));
}
 unregisterToVol(volunteerId: string, timeslotId: string):Observable<any>{
      // https://localhost:8443/volunteer/5b6f3d713b03203e486a65f1/timeslot/5b6f3d713b03203e486a65f2/register
      return this.http.delete(baseURL +'volunteer/'+volunteerId+'/timeslot/'+timeslotId+'/register')
      .catch(err => this.processHTTPMsgService.handleError(err));
}
 getRegisters(volunteerId):Observable<any> {
      return this.http.get(baseURL + 'volunteer/'+ volunteerId +'/timeslots/getregisters')
      .catch(err => this.processHTTPMsgService.handleError(err));
}

getRegistedTimeslots():Observable<any>{
     return this.http.get(baseURL + 'volunteer/user/volunteers')
     .catch(err => this.processHTTPMsgService.handleError(err));
}



}
