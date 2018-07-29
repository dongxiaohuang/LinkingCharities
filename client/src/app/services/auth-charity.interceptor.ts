import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { AuthCharityService } from './auth-charity.service';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

@Injectable()
// export class AuthCharityInterceptor implements HttpInterceptor {
//   constructor(private inj: Injector) { }
//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     const authCharityService = this.inj.get(AuthCharityService);
//     const authCharityToken = authCharityService.getToken();
//          console.log('charity auth interceptor', req.headers);
//       const authReq = req.clone({ headers: req.headers.set('Authorization', 'bearer ' + authCharityToken) });
//       return next.handle(authReq);
//   }
// }

@Injectable()
export class UnauthorizedCharityInterceptor implements HttpInterceptor {
  constructor(private inj: Injector) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authCharityService = this.inj.get(AuthCharityService);
    const authCharityToken = authCharityService.getToken();
    return next
      .handle(req)
      .pipe(tap(
        (event: HttpEvent<any>) => {
          //do nothing
        }, (err: any) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401 && authCharityToken) {
              console.log("Unauthorized Interceptor: ", err);
              authCharityService.checkJWTtoken();
            }
          }
        }
      ))
  }
}
