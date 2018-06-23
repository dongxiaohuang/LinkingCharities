import { Injectable } from '@angular/core';
import { CoverPic } from '../shared/coverPic';
import { COVERPICS } from '../shared/coverPictures';
import { of, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class GetCoverPicsService {

  constructor() { }
  getAllCoverPics(): Observable<CoverPic[]> {
       return of(COVERPICS);
 };
}
