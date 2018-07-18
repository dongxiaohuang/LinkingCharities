import { Component, OnInit, Input } from '@angular/core';
import { baseURL } from '../shared/baseurl';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
@Input()
charity;
baseUrl = baseURL;
  constructor() { }

  ngOnInit() {
  }

}
