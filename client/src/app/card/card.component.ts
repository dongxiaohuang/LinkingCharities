import { Component, OnInit, Input } from '@angular/core';
import { baseURL } from '../shared/baseurl';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
@Input()
charity;

baseUrl = baseURL;
  constructor(config: NgbRatingConfig,
 ) {
       config.max = 5; }

  ngOnInit() {
  }

}
