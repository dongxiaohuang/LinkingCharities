import { Injectable } from '@angular/core';
import { Charity } from '../shared/charity';
import { CHARITIES } from '../shared/charities';

@Injectable({
  providedIn: 'root'
})
export class GetCharitiesService {

  constructor() { }
  getChairties(): Charity[] {
       return CHARITIES;
 };
}