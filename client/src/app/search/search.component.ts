import { Component, OnInit } from '@angular/core';
import { SearchService } from '../services/search.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
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
   page = 1;

   content: any;



   ngOnInit() {
     this.activatedRoute.params.subscribe(res => {
          console.log("search router",res);
       this.query = res['query'];
       this.page = 1;
       // this.getProducts();
       this.searchService.getSearchResults(this.query, this.page-1)
          .subscribe((res) => {
               this.content = res;
          })

     });
   }


}
