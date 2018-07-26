import { Component, OnInit } from '@angular/core';
import { GetCharitiesService } from '../services/get-charities.service';
import { Params, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  id: string;
  page: number = 1;
  totalPages: number;
  totalNumber: number;
  numberPerPage: number;
  charities;
  category: string;
  constructor(private getCharitiesService: GetCharitiesService,
    private route: ActivatedRoute, ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.getCharitiesByCategory(this.id, this.page - 1);
  }
  get lower() {
    return 1 + (this.page - 1) * this.numberPerPage;
  }
  get upper() {
    return Math.min(this.totalNumber, this.page * this.numberPerPage);
  }

  getCharitiesByCategory(categoryId: string, page: number) {
    this.getCharitiesService.getCharityByCategory(categoryId, page)
      .subscribe(
        (res) => {
          this.charities = res.charities;
          this.totalPages = res.totalNumber;
          this.numberPerPage = res.numberPerPage;
          this.totalNumber = res.totalNumber;
          this.category = res.categoryName;
        }
      )

  }

}
