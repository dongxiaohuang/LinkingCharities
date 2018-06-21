import { Injectable } from '@angular/core';
import { CoverPic } from '../shared/coverPic';
import { COVERPICS } from '../shared/coverPictures';
import { of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class GetCoverPicsService {

  constructor() { }
  getAllCoverPics(): Promise<CoverPic[]> {
       return of(COVERPICS).toPromise();
 };
}
