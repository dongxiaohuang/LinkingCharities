import { Component, OnInit } from '@angular/core';
import { CoverPic } from '../shared/coverPic';
import { GetCoverPicsService } from '../services/get-cover-pics.service';

@Component({
  selector: 'app-jumbotron',
  templateUrl: './jumbotron.component.html',
  styleUrls: ['./jumbotron.component.scss']
})
export class JumbotronComponent implements OnInit {
  coverPics: CoverPic[];
  constructor(private coverPicsService: GetCoverPicsService) { }

  ngOnInit() {
       this.coverPicsService.getAllCoverPics()
       .subscribe(pics => this.coverPics = pics);
  }


}
