import { Injectable } from '@angular/core';
import { CoverPic } from '../shared/coverPic';
import { COVERPICS } from '../shared/coverPictures';
import { of, Observable } from 'rxjs';

import { RestangularModule, Restangular } from 'ngx-restangular';


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
