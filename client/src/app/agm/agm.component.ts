import { Component, OnInit } from '@angular/core';
import { Marker } from '../shared/marker';
import { HttpClient } from '@angular/common/http';
import { tap, mergeMap } from 'rxjs/operators';
import { MapResponse } from '../utils/helpers';
import { GetCharitiesService } from '../services/get-charities.service';
import { baseURL } from '../shared/baseurl';
@Component({
  selector: 'app-agm',
  templateUrl: './agm.component.html',
  styleUrls: ['./agm.component.scss']
})
export class AgmComponent implements OnInit {
     //TODO set current geocode
  lat: number = 51.4933327;
  lng: number = -0.196546;
  zoom = 10;
  baseUrl = baseURL;
  constructor(private http: HttpClient,
     private getCharitiesService: GetCharitiesService) { }

  markers:Marker[] = [];
  ngOnInit() {
       this.getCharitiesService.getAllCharities()
       .subscribe(res => {
            console.log(res);
            res.map(charity => {
                 let mk: Marker = {
                      lat: undefined,
                      lng: undefined,
                      img: undefined,
                      id: undefined,
                      name: undefined,
                      description: undefined
                 };
                 console.log(charity.name);
                 mk.name = charity.name;
                 mk.img = charity.images[0];
                 mk.id = charity._id;
                 mk.description = charity.info;
                 mk.lat = charity.geocoding.lat;
                 mk.lng = charity.geocoding.lng;
                 this.markers.push(mk);
            });
            console.log(this.markers);
       })
  }



}
