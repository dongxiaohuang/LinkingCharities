import { Component, OnInit } from '@angular/core';
import { Marker } from '../shared/marker';
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
  constructor() { }

  ngOnInit() {
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
