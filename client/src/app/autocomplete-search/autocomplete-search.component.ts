import { Component, NgModule, ViewChild, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormControl, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgSelectModule, NgOption } from '@ng-select/ng-select';
import { GetCharitiesService } from '../services/get-charities.service';
import { Charity, CharityIdName } from '../shared/charity';


@Component({
  selector: 'app-autocomplete-search',
  templateUrl: './autocomplete-search.component.html',
  styleUrls: ['./autocomplete-search.component.scss']
})


export class AutocompleteSearchComponent implements OnInit {
  charities: Charity[];
  selectedCityId: number;
  ngOnInit(): void {

    this.charitiesService.getChairties()
      .subscribe((charities) => {
        this.charities = charities;
      });
  }

  constructor(private charitiesService: GetCharitiesService) {
  }
  
}
