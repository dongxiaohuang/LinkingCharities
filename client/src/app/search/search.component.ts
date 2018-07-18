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
  constructor(private searchService: SearchService,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient) { }
  query: string;
  page: number = 1;
  baseUrl = baseURL;
  content: any;



  ngOnInit() {
    this.activatedRoute.params.subscribe(res => {

      console.log("search router", res);
      this.query = res['query'];
      this.page = res['page'];
      this.getCharities(this.query, this.page);
    });
  }

  get lower() {
    return 1 + this.content.search_result.hitsPerPage * this.content.search_result.page;
  }

  get upper() {
    return Math.min(
      this.content.search_result.hitsPerPage * (this.content.search_result.page + 1),
      this.content.search_result.nbHits,
    );
  }

  getCharities(query: string, page: number) {
    this.searchService.getSearchResults(query, page - 1)
      .subscribe((res) => {
        this.content = res;
        this.content.search_result.hits.forEach(charity => {
            charity._id = charity.objectID;
            delete charity.objectID;
        });

      })
  }

}
