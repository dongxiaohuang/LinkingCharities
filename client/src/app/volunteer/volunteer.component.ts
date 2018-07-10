import { Component, OnInit } from '@angular/core';
import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';
import { FavoriteService } from '../services/favorite.service';
@Component({
  selector: 'app-volunteer',
  templateUrl: './volunteer.component.html',
  styleUrls: ['./volunteer.component.scss'],
   providers: [NgbDropdownConfig] // add NgbDropdownConfig to the component providers
})
export class VolunteerComponent implements OnInit {

  constructor(config: NgbDropdownConfig,
       private favoriteService: FavoriteService
 ) { config.autoClose = false; }

  ngOnInit() {
  }

}
