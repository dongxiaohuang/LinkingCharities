// import { Injectable } from '@angular/core';
//
// import { Observable } from 'rxjs';
// import { Http, Response } from '@angular/http';
//
// import 'rxjs/add/observable/throw';
// @Injectable({
//   providedIn: 'root'
// })
// export class ProcessHTTPMsgService {
//
//   constructor() { }
//
//
//   public extractData(res: Response) {
//        let body = res.json();
//
//        return body || { }; // if  null return { }
//  }
//
//  public handleError( error: Response | any ){
//       let errMsg: string;
//
//       if(error instanceof Response){
//            const body = error.json() || '';
//            const err = body.error || JSON.stringify(body);
//            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
//       }else {
//            errMsg = error.message ? error.message: error.toString();
//       }
//       console.error(errMsg);
//       return Observable.throw(errMsg);
// }
// }
