import { Component, OnInit } from '@angular/core';
import { Marker } from '../shared/marker';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
@Component({
  selector: 'app-agm',
  templateUrl: './agm.component.html',
  styleUrls: ['./agm.component.scss']
})
export class AgmComponent implements OnInit {
  title: string = 'My first AGM project';
  lat: number = 51.678418;
  lng: number = 7.809007;
  zoom = 10;
  aa;
  constructor(private http: HttpClient) { }

  ngOnInit() {
       this.http.get('https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA')
      .pipe(tap(res => console.log(res)))
      .subscribe(res => this.aa = res)
  }

  markers: Marker[] = [
       {
		  lat: 51.673858,
		  lng: 7.815982,
            img: "../../assets/img/carousel2.jpg",
		  id: "www.google.com",
            name: "charity 2",
            description:"ssss"
	  },
	  {
		  lat: 51.373858,
		  lng: 7.215982,
            img: "../../assets/img/carousel4.jpg",
            id: "www.google.com",
            name: "charity 3",
            description:"ssss"
	  },
	  {
		  lat: 51.723858,
		  lng: 7.895982,
            img: "../../assets/img/carousel1.jpg",
            id: "www.google.com",
            name: "charity 1",
            description:"ssss"
	  }
 ];
 // just an interface for type safety.


}
