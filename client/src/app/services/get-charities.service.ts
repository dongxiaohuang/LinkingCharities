import { Injectable } from '@angular/core';
import { Charity } from '../shared/charity';
import { CHARITIES } from '../shared/charities';

@Injectable({
  providedIn: 'root'
})
export class GetCharitiesService {

  constructor() { }
  getChairties(): Promise<Charity[]> {
    // return Promise.resolve(CHARITIES);
    return new Promise(
         resolve => resolve(CHARITIES) );
  };
  getCharity(id: number): Promise<Charity> {
    // return Promise.resolve(CHARITIES.filter(
    //   (charity) => charity.id == id
    // )[0]);
    return new Promise(
         resolve => {
              resolve(CHARITIES.filter(
                   charities => charities.id == id
              )[0])
         }
    )
  }
}
