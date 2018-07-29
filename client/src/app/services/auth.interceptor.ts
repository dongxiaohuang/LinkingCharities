import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './auth.service';
import { AuthCharityService } from './auth-charity.service';
import { Observable } from 'rxjs/Observable';
import { tap, map } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private inj: Injector) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authService = this.inj.get(AuthService);
    const authCharityService = this.inj.get(AuthCharityService);
    // Get the auth header from the service.
    const authToken = authService.getToken();
    const authCharityToken = authCharityService.getToken();
    // console.log("Interceptor: " + authToken);
    // Clone the request to add the new header.
    console.log("auth interceptor", req.headers);
    if(authToken != undefined){
         const authReq = req.clone({headers: req.headers.set('Authorization', 'bearer ' + authToken)});
         return next.handle(authReq);
    }
    if(authCharityToken != undefined){
         const authReq = req.clone({headers: req.headers.set('Authorization', 'bearer ' + authCharityToken)});
         return next.handle(authReq);
    }
    console.log(authToken);
    return next.handle(req);
  }
}

@Injectable()
export class UnauthorizedInterceptor implements HttpInterceptor {
  constructor(private inj: Injector) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authService = this.inj.get(AuthService);
    const authToken = authService.getToken();

    return next
      .handle(req)
      .pipe(tap((event: HttpEvent<any>) => {
        // do nothing
      }, (err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401 && authToken) {
            console.log("Unauthorized Interceptor: ", err);
            authService.checkJWTtoken();
          }
        }
   }));
  }
}
