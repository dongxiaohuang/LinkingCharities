import { Component, OnInit } from '@angular/core';
import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-volunteer',
  templateUrl: './volunteer.component.html',
  styleUrls: ['./volunteer.component.scss'],
   providers: [NgbDropdownConfig] // add NgbDropdownConfig to the component providers
})
export class VolunteerComponent implements OnInit {

  constructor(config: NgbDropdownConfig) { config.autoClose = false; }

  ngOnInit() {
  }

}
