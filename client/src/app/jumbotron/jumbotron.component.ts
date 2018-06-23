import { Component, OnInit } from '@angular/core';
import { CoverPic } from '../shared/coverPic';
import { GetCoverPicsService } from '../services/get-cover-pics.service';
import { baseURL } from '../shared/baseurl';
@Component({
  selector: 'app-jumbotron',
  templateUrl: './jumbotron.component.html',
  styleUrls: ['./jumbotron.component.scss']
})
export class JumbotronComponent implements OnInit {
  coverPics: CoverPic[];
  constructor(private coverPicsService: GetCoverPicsService) { }
  baseUrl = baseURL;
  ngOnInit() {
       this.coverPicsService.getAllCoverPics()
       .subscribe(pics => this.coverPics = pics);
  }


}
