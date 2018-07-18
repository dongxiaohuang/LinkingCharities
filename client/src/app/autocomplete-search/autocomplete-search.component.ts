import { Component, NgModule, ViewChild, OnInit, Input } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormControl, FormGroup, FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgSelectModule, NgOption } from '@ng-select/ng-select';
import { GetCharitiesService } from '../services/get-charities.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'app-autocomplete-search',
  templateUrl: './autocomplete-search.component.html',
  styleUrls: ['./autocomplete-search.component.scss']
})


export class AutocompleteSearchComponent implements OnInit {
  searchKeywords: string[] = [];
  @Input()
  searchKey: string = "";
  searchForm: FormGroup;
  ngOnInit(): void {

    this.charitiesService.getChairties()
      .subscribe((charities) => {
        charities.forEach(charity => {
          this.searchKeywords.push(charity.name);
          // TODO: use a shared data structure
          if (this.searchKeywords.indexOf(charity.location) == -1)
            this.searchKeywords.push(charity.location);
          // this.searchKeywords.push(charity.name);
        });
      });

  }


  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 2 ? []
        : this.searchKeywords.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    );


  constructor(private charitiesService: GetCharitiesService,
    private router: Router,
    private fb: FormBuilder) {

    this.searchForm = this.fb.group({
      key: ['']
    })
  }
  doSearch() {
    this.router.navigate(['/search', { query: this.searchForm.value.key, page: 1 }]);
  };


}
