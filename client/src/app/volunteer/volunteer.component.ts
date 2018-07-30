import { Component, OnInit } from '@angular/core';
import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';
import { FavoriteService } from '../services/favorite.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-volunteer',
  templateUrl: './volunteer.component.html',
  styleUrls: ['./volunteer.component.scss'],
   providers: [NgbDropdownConfig] // add NgbDropdownConfig to the component providers
})
export class VolunteerComponent implements OnInit {
  files: File[] = [];
  constructor(config: NgbDropdownConfig,
       private favoriteService: FavoriteService,
       private http: HttpClient
 ) { config.autoClose = false; }

  ngOnInit() {
  }

  onUploadFinished(event){
       this.files.push(event.file);
       console.log(this.files);
 }
 onUploadStateChanged(event){
      console.log("upload status ", event)
}
onRemoved(event){
     let idx = this.files.indexOf(event.file);
     this.files.splice(idx,1);
     console.log("after removed", this.files)
}
onUpload(){
     const fd = new FormData();
     for(let i = 0; i < this.files.length; i++){
          fd.append('imageFile', this.files[i], this.files[i].name.toLowerCase());
     }
     this.http.post('http://localhost:8000/imageUpload/charitiesPics', fd, {
      reportProgress: true,
      observe: 'events'
    })
    .subscribe(event => console.log(event))
     console.log(fd);
}

}
