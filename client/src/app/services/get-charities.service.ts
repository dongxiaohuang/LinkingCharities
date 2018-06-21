import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Charity } from '../shared/charity';
import { CHARITIES } from '../shared/charities';

@Injectable({
  providedIn: 'root'
})
export class GetCharitiesService {

  constructor() { }
  getChairties(): Promise<Charity[]> {
    // return Promise.resolve(CHARITIES);
     return of(CHARITIES).toPromise();
  };
  getCharity(id: number): Promise<Charity> {
    // return Promise.resolve(CHARITIES.filter(
    //   (charity) => charity.id == id
    // )[0]);
    return of(CHARITIES.filter(
                   charities => charities.id == id
              )[0]).toPromise();
  }
}
