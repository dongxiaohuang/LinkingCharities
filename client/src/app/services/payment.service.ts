import { Injectable } from '@angular/core';
import { baseURL } from '../shared/baseurl';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient,
 private processHTTPMsgService: ProcessHTTPMsgService) { }
  makeDonation(amount, stripeToken, charityId, message):Observable<any>{
      return  this.http.post(baseURL +'donation',{
            "amount": amount,
            "stripeToken":stripeToken,
            "charity":charityId,
            "message":message
       })
       .catch(err => this.processHTTPMsgService.handleError(err));
 }
 getDonorDonations(page: number): Observable<any>{
      return this.http.get(baseURL + 'donation/user?page='+page)
      .catch(err => this.processHTTPMsgService.handleError(err));
}
getCharityDonations(page: number): Observable<any>{
    return this.http.get(baseURL + 'donation?page='+page)
    .catch(err => this.processHTTPMsgService.handleError(err));
}
}
