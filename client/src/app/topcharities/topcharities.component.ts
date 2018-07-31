import { Component, OnInit, Input } from '@angular/core';
import { Charity } from '../shared/charity';

@Component({
  selector: 'app-topcharities',
  templateUrl: './topcharities.component.html',
  styleUrls: ['./topcharities.component.scss']
})
export class TopcharitiesComponent implements OnInit {
  favorite = {};
  @Input()
  charities: Charity[];
  constructor(
 ) { }
  ngOnInit() {

  }


}
