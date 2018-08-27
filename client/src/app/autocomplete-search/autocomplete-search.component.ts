import { Component, NgModule, ViewChild, OnInit, Input } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormControl, FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';


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

  constructor(
       private router: Router,
       private fb: FormBuilder) {}

  ngOnInit(): void {

    this.searchForm = this.fb.group({
      keyword: ['', Validators.required]
    })
  }

  doSearch() {
    this.router.navigate(['/search', { query: this.searchForm.value.keyword, page: 1 }]);
    this.searchForm.reset();
  };


}
