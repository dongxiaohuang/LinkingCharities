import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { Subject } from 'rxjs/Subject';
import { JWTResponse, AuthResponse, RegisterResponse } from '../utils/helpers';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

interface upLoadImgResponse {
     exists: boolean,
     urls:any[]
};
@Injectable({
  providedIn: 'root'
})
export class AuthCharityService {


  tokenKey: string = 'JWT_Charity';
  isAuthenticated: boolean = false;
  charity: Subject<string> = new Subject<string>();
  authToken: string = undefined;

  constructor(private http: HttpClient,
       private router: Router,
    private processHTTPMsgService: ProcessHTTPMsgService) { }

  checkJWTtoken() {
    this.http.get<JWTResponse>(baseURL + 'charityusers/checkJWTToken')
      .subscribe(res => {
        console.log("JWT Token Valid: ", res);
        this.sendUsername(res.user.username);
      },
        err => {
          console.log("JWT Token invalid: ", err);
          this.destroyUserCredentials();
        })
  };

  sendUsername(name: any): any {
    this.charity.next(name);
  };

  clearUsername(): any {
    this.charity.next(undefined);
  };

  loadCharityCredentials() {
    var credentials = JSON.parse(localStorage.getItem(this.tokenKey));
    console.log("loadCharityUserCredentials", credentials);
    if (credentials && credentials.username != undefined) {
      this.useCredentials(credentials);
      if (this.authToken)
        this.checkJWTtoken();
    }
  };

  storeCharityCredentials(credentials: any) {
    console.log("storeCharityCredentials ", credentials);
    localStorage.setItem(this.tokenKey, JSON.stringify(credentials));
    this.useCredentials(credentials);
    this.isAuthenticated = true;
  };

  useCredentials(credentials: any) {
    this.isAuthenticated = true;
    this.sendUsername(credentials.username);
    this.authToken = credentials.token;
  };

  destroyUserCredentials() {
    this.authToken = undefined;
    this.clearUsername();
    this.isAuthenticated = false;
    localStorage.removeItem(this.tokenKey);
    this.isAuthenticated = false;
  }


  signUp(user: any): Observable<any> {
    // localhost:8000/charityusers/signup
    return this.http.post(baseURL + 'charityusers/signup', user)
      // .pipe(
      //   map(res => {
      //     return { 'success': true, 'username': user.username };
      //   })
      // )
      .catch(error => this.processHTTPMsgService.handleError(error));
  }
  logIn(user: any): Observable<any> {
    return this.http.post<AuthResponse>(baseURL + 'charityusers/login',
      { "username": user.username, "password": user.password })
      .pipe(
        map(res => {
          this.storeCharityCredentials({ username: user.username, token: res.token });
          return { 'success': true, 'username': user.username };
        })
      )
      .catch(error => this.processHTTPMsgService.handleError(error));
  };
  logOut() {
    this.destroyUserCredentials();
    this.router.navigate(['/']);
  };
  isLoggedIn(): Boolean {
    return this.isAuthenticated;
  };
  getUsername(): Observable<string> {
    return this.charity.asObservable();
  };
  getToken(): string {
    return this.authToken;
  };

  postCharity(charity: any): Observable<any> {
    //localhost:8000/charities/newCharities
    return this.http.post(baseURL + 'charities', charity)
      .catch(error => this.processHTTPMsgService.handleError(error));
  }

  postCard(card: any): Observable<any> {
    //localhost:8000/paymentdetails
    return this.http.post(baseURL + 'paymentdetails', card)
      .catch(error => this.processHTTPMsgService.handleError(error));
  }

  getProfile(): Observable<any>{
       // localhost:8000/charityusers/profile
       return this.http.get(baseURL + 'charityusers/profile')
       .catch(error => this.processHTTPMsgService.handleError(error));

 }

  postPictures(fd: FormData, charityId:string): Observable<any> {
      return  this.http.post(baseURL +'imageUpload/charitiesPics/'+charityId, fd)
      .catch(error => this.processHTTPMsgService.handleError(error));
 }
 uploadPictures(fd: FormData): Observable<upLoadImgResponse>{
     return  this.http.post<upLoadImgResponse>(baseURL +'imageUpload/charitiesPics/', fd)
     .catch(error => this.processHTTPMsgService.handleError(error));
}

 changePSW(psw): Observable<any> {
      return this.http.put(baseURL + 'charityusers/newpassword', psw)
      .catch(error => this.processHTTPMsgService.handleError(error));

}
 changeProfile(pf): Observable<any>{
      return this.http.put(baseURL +'charityusers/profile', pf)
      .catch(error => this.processHTTPMsgService.handleError(error));
}
 changePaymentDetail(cardId:string, paymentDetail): Observable<any> {
      return this.http.put(baseURL + 'paymentdetails/'+cardId, paymentDetail)
      .catch(error => this.processHTTPMsgService.handleError(error));
}
changeCharity(charityId: string, content:any){
     return this.http.put(baseURL +'charities/'+charityId, content)
     .catch(error => this.processHTTPMsgService.handleError(error));
}
// getDonations(page: number): Observable<any>{
//     return this.http.get(baseURL + 'donation?page='+page)
//     .catch(err => this.processHTTPMsgService.handleError(err));
// }
checkId(username): Observable<any>{
     return this.http.post(baseURL + 'charityusers/checkId', {username:username})
     .catch(err => this.processHTTPMsgService.handleError(err));
}
getVerified(ccn:number=undefined, charityuserId:string=undefined): Observable<any>{
     console.log('ccn',ccn, ' charityuserId', charityuserId)
     if(!ccn || ! charityuserId){
          return this.http.get(baseURL + 'charityusers/verification')
          .catch(err => this.processHTTPMsgService.handleError(err));
     }else{
          return this.http.get(baseURL + 'charityusers/verification?ccn='+ccn+'&charityuser='+charityuserId)
          .catch(err => this.processHTTPMsgService.handleError(err));
     }
}
}
