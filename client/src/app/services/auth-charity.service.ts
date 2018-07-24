import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';


@Injectable({
  providedIn: 'root'
})
export class AuthCharityService {

  constructor(private http: HttpClient,
           private processHTTPMsgService: ProcessHTTPMsgService) { }
  signUp(user: any): Observable<any> {
       // localhost:8000/charityusers/signup
       return this.http.post(baseURL + 'charityusers/signup', user)
       .catch(error => this.processHTTPMsgService.handleError(error));
 }
  postCharity(charity: any): Observable<any> {
       //localhost:8000/charities/newCharities
       return this.http.post(baseURL +'charities', charity)
       .catch(error => this.processHTTPMsgService.handleError(error));
 }

 postCard(card: any): Observable<any>{
      //localhost:8000/paymentdetails
      return this.http.post(baseURL + 'paymentdetails', card)
      .catch(error => this.processHTTPMsgService.handleError(error));
}
}
