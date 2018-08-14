import { Component, OnInit } from '@angular/core';
import { SearchService } from '../services/search.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
     charities: any;
  numberPerPage: number;
  totalNumber: number;
  search_key: number;
  constructor(private searchService: SearchService,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient) { }
  query: string;
  page: number = 1;
  perPage:number =10;
  content;


  ngOnInit() {
    this.activatedRoute.params.subscribe(res => {

      console.log("search router", res);
      this.query = res['query'];
      this.page = res['page'];
      this.getCharities(this.query, this.page);
    });
  }

  get lower() {
    return 1 + this.numberPerPage * this.page-1;
  }

  get upper() {
    return Math.min(
      this.totalNumber, this.page * this.numberPerPage
    );
  }

  getCharities(query: string, page: number) {
    this.searchService.getSearchResults(query, page - 1)
      .subscribe((res) => {
       this.content = res;
       this.search_key = res.search_key;
       this.totalNumber = res.totalNumber;
       this.numberPerPage = res.numberPerPage;
       this.charities = res.search_result;
      })
  }

}
