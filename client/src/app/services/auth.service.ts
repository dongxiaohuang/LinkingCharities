import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { Router } from '@angular/router';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

import 'rxjs/add/operator/catch';
import { JWTResponse, AuthResponse, RegisterResponse } from '../utils/helpers';


@Injectable()
export class AuthService {

  tokenKey: string = 'JWT_User';
  isAuthenticated: boolean = false;
  username: Subject<string> = new Subject<string>();
  authToken: string = undefined;

  constructor(private http: HttpClient,
    private router: Router,
    private processHTTPMsgService: ProcessHTTPMsgService) {
  }

  checkJWTtoken() {
    this.http.get<JWTResponse>(baseURL + 'users/checkJWTtoken')
      .subscribe(res => {
        console.log("JWT Token Valid: ", res);
        this.sendUsername(res.user.username);
      },
        err => {
          console.log("JWT Token invalid: ", err);
          this.destroyUserCredentials();
        })
  }

  sendUsername(name: string) {
    this.username.next(name);
  }

  clearUsername() {
    this.username.next(undefined);
  }

  loadUserCredentials() {
    var credentials = JSON.parse(localStorage.getItem(this.tokenKey));
    console.log("loadUserCredentials ", credentials);
    if (credentials && credentials.username != undefined) {
      this.useCredentials(credentials);
      if (this.authToken)
        this.checkJWTtoken();
    }
  }

  storeUserCredentials(credentials: any) {
    console.log("storeUserCredentials ", credentials);
    localStorage.setItem(this.tokenKey, JSON.stringify(credentials));
    this.useCredentials(credentials);
  }

  useCredentials(credentials: any) {
    this.isAuthenticated = true;
    this.sendUsername(credentials.username);
    this.authToken = credentials.token;
  }

  destroyUserCredentials() {
    this.authToken = undefined;
    this.clearUsername();
    this.isAuthenticated = false;
    localStorage.removeItem(this.tokenKey);
  }

  signUp(user: any): Observable<any> {
    return this.http.post(baseURL + 'users/signup',
      user)
      .pipe(
        map(res => {
          return { 'success': true, 'username': user.username };
        })
      )
      .catch(error => { return this.processHTTPMsgService.handleError(error); });
  }

  logIn(user: any): Observable<any> {
    return this.http.post<AuthResponse>(baseURL + 'users/login',
      { "username": user.username, "password": user.password })
      .pipe(
        map(res => {
          this.storeUserCredentials({ username: user.username, token: res.token });
          return { 'success': true, 'username': user.username };
        })
      )
      .catch(error => { return this.processHTTPMsgService.handleError(error); });
  }

  facebookLogIn(SocialUser):Observable<any> {
       return this.http.get<AuthResponse>(baseURL + 'users/facebook/token?access_token='+SocialUser.token)
        .pipe(
          map(res => {
            this.storeUserCredentials({ username: SocialUser.name, token: res.token });
            return { 'success': true, 'username': SocialUser.name };
          })
        )
        .catch(error => { return this.processHTTPMsgService.handleError(error); });
 }

  logOut() {
    this.destroyUserCredentials();
    this.router.navigate(['/']);
  }

  isLoggedIn(): Boolean {
    return this.isAuthenticated;
  }

  getUsername(): Observable<string> {
    return this.username.asObservable();
  }

  getToken(): string {
    return this.authToken;
  }

  getProfile(): Observable<any> {
    return this.http.get(baseURL + 'users/profile')
      .catch(err => this.processHTTPMsgService.handleError(err));
  }
  postImage(fd: FormData): Observable<any>{
       return this.http.post(baseURL + 'imageUpload', fd, {
        reportProgress: true,
        observe: 'events'
      })
       .catch(err => this.processHTTPMsgService.handleError(err));
 }
  changeProfile(newProfile: any): Observable<any> {
       return this.http.put(baseURL + 'users/profile', newProfile)
       .catch(err => this.processHTTPMsgService.handleError(err));
 }
  changePSW(newPSW: any): Observable<any> {
    return this.http.put(baseURL + 'users/newpassword', newPSW)
      .catch(error => { return this.processHTTPMsgService.handleError(error); });
  }
  getDonations(page: number): Observable<any>{
       return this.http.get(baseURL + 'donation/user?page='+page)
       .catch(err => this.processHTTPMsgService.handleError(err));
 }
}
