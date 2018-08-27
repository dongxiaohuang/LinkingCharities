import { Injectable } from '@angular/core';
import { baseURL } from '../shared/baseurl';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient,) { }
  makeDonation(amount, stripeToken, charityId, message):Observable<any>{
      return  this.http.post(baseURL +'payment',{
            "amount": amount,
            "stripeToken":stripeToken,
            "charity":charityId,
            "message":message
       })
 }
}
