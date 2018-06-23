import { Injectable } from '@angular/core';
import { CoverPic } from '../shared/coverPic';
import { Observable } from 'rxjs';

import { Restangular } from 'ngx-restangular';


import { baseURL } from '../shared/baseurl';
@Injectable({
  providedIn: 'root'
})
export class GetCoverPicsService {

  constructor(private restangular: Restangular) { }
  getAllCoverPics(): Observable<CoverPic[]> {
       return this.restangular.all('coverpics').getList();
 };
}
