import { Component, NgModule, ViewChild, OnInit, Input } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormControl, FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
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
  searchKeywords: string[]=[];
  @Input()
  searchKey: string = "";
  searchForm: FormGroup;

  constructor(private charitiesService: GetCharitiesService,
       private router: Router,
       private fb: FormBuilder) {}

  ngOnInit(): void {

    // this.charitiesService.getChairties()
    //   .subscribe((charities) => {
    //        console.log(charities);
    //     charities.forEach(charity => {
    //       this.searchKeywords.push(charity.name);
    //       // TODO: use a shared data structure
    //       // if (this.searchKeywords.indexOf(charity.country) == -1)
    //       //   this.searchKeywords.push(charity.country);
    //       // this.searchKeywords.push(charity.name);
    //     });
    //   });

    this.searchForm = this.fb.group({
      keyword: ['', Validators.required]
    })
  }


  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 2 ? []
        : this.searchKeywords.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    );


  doSearch() {
    this.router.navigate(['/search', { query: this.searchForm.value.keyword, page: 1 }]);
    this.searchForm.reset();
  };


}
