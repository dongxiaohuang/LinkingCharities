import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Http } from '@angular/http';

import 'rxjs/add/observable/throw';
import { HttpErrorResponse } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ProcessHTTPMsgService {

  constructor() { }


  public extractData(res: Response) {
       let body = res.json();

       return body || { }; // if  null return { }
 }

 public handleError( error: Response | any ){
      let errMsg: string;
      console.log(error)
      if(error instanceof HttpErrorResponse){
           const body = error.error;
           const err = body.err || JSON.stringify(body);
           errMsg = `${error.statusText || ''} ${err.message}`;
      }else {
           errMsg = error.message ? error.message: error.toString();
      }
      console.error(errMsg);
      return Observable.throw(errMsg);
}
}
