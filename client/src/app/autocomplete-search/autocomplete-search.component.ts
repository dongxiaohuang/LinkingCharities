import { Component, NgModule, ViewChild, OnInit, Input } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormControl, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgSelectModule, NgOption } from '@ng-select/ng-select';
import { GetCharitiesService } from '../services/get-charities.service';
import { Charity, CharityIdName } from '../shared/charity';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-autocomplete-search',
  templateUrl: './autocomplete-search.component.html',
  styleUrls: ['./autocomplete-search.component.scss']
})


export class AutocompleteSearchComponent implements OnInit {
  charities: Charity[];
  selectedCityId: number;
  
  @Input()
  searchKey: string ="";

  ngOnInit(): void {

    this.charitiesService.getChairties()
      .subscribe((charities) => {
        this.charities = charities;
      });
  }

  constructor(private charitiesService: GetCharitiesService,
               private router: Router) {
  }
  doSearch(){
       this.router.navigate(['/discover', {key: this.searchKey}]);
       // this.router.navigate(['/discovery', {term: this.term}]);
 };


}
