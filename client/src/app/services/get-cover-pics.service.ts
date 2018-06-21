import { Injectable } from '@angular/core';
import { CoverPic } from '../shared/coverPic';
import { COVERPICS } from '../shared/coverPictures';
@Injectable({
  providedIn: 'root'
})
export class GetCoverPicsService {

  constructor() { }
  getAllCoverPics(): Promise<CoverPic[]> {
       return new Promise(
            resolve => resolve(COVERPICS)
       )
 };
}
