import { Component, OnInit } from '@angular/core';
import { Marker } from '../shared/marker';
import { HttpClient } from '@angular/common/http';
import { tap, mergeMap } from 'rxjs/operators';
import { MapResponse } from '../utils/helpers';
import { GetCharitiesService } from '../services/get-charities.service';
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
  constructor(private http: HttpClient,
     private getCharitiesService: GetCharitiesService) { }

  ngOnInit() {
       // this.getCharitiesService.getChairties(0)
       //    .pipe(
       //         mergeMap( res => {
       //              console.log(res);
       //              return res;
       //         })
       //    )
       //    .subscribe(res => console.log('new res'))
          /*** GET current Location of browswr**/
    // navigator.geolocation.getCurrentPosition(function(location) {
    //   this.lat = location.coords.latitude;
    //   this.lng = location.coords.longitude;
    //   console.log(location.coords.latitude);
    //   console.log(location.coords.longitude);
    //   console.log(location.coords.accuracy);
    // });

    this.http.get<MapResponse>('https://maps.googleapis.com/maps/api/geocode/json?address=' + 'earls court, london')
    .pipe( mergeMap(res => {
         this.aa = res.results[0].geometry.location;
         return this.http.put('http://localhost:8000/charities/5b5f77b6be0b7a3ace24dc41/geocode', this.aa)
    }))
      .subscribe(res => console.log(res));

  }

  markers: Marker[] = [
    {
      lat: 51.673858,
      lng: 7.815982,
      img: "../../assets/img/carousel2.jpg",
      id: "www.google.com",
      name: "charity 2",
      description: "ssss"
    },
    {
      lat: 51.373858,
      lng: 7.215982,
      img: "../../assets/img/carousel4.jpg",
      id: "www.google.com",
      name: "charity 3",
      description: "ssss"
    },
    {
      lat: 51.723858,
      lng: 7.895982,
      img: "../../assets/img/carousel1.jpg",
      id: "www.google.com",
      name: "charity 1",
      description: "ssss"
    }
  ];
  // just an interface for type safety.


}
