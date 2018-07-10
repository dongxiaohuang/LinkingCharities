import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Charity } from '../shared/charity';

import { Restangular } from 'ngx-restangular';

@Injectable({
  providedIn: 'root'
})
export class GetCharitiesService {

  constructor(private restangular: Restangular) { }
  getChairties(): Observable<Charity[]> {
     return this.restangular.all('charities').getList();
  };
  getCharity(id: string): Observable<Charity> {
    return this.restangular.one('charities', id).get();
  }
}
