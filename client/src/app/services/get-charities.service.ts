import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { Charity } from '../shared/charity';
import { CHARITIES } from '../shared/charities';

@Injectable({
  providedIn: 'root'
})
export class GetCharitiesService {

  constructor() { }
  getChairties(): Observable<Charity[]> {
    // return Promise.resolve(CHARITIES);
     return of(CHARITIES);
  };
  getCharity(id: number): Observable<Charity> {
    // return Promise.resolve(CHARITIES.filter(
    //   (charity) => charity.id == id
    // )[0]);
    return of(CHARITIES.filter(
                   charities => charities.id == id
              )[0]);
  }
}
