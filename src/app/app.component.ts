import { Component, OnInit } from '@angular/core';

import { Http, HttpModule, Headers, Response, RequestOptions, RequestMethod } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  public resources: any = {
    name: 'Name',
    address: 'Address',
    location: 'Location',
    latitude: 'Latitude',
    longitude: 'Longitude',
    location_list: 'LocationList',
    pictures: 'Pictures',
  }

  public map: any = {
    location: {
      latitude: 10.823099,
      longitude: 106.629664,
    },
    address: {
      formatted_address: '',
      long_name: '',
      short_name: '',
    }
  }

  public model: any = {};
  constructor(private http: Http) { }

  private getLatLongByLocation(name: String): Observable<any> {

    let url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + name + '&key=AIzaSyD9kUn8_TBheTkprqbt1vWg0wB19dfph10';
    return this.http.get(url).map((response: Response | any) => {
      var data = response.json();
      return data;
    });

  }
  getLatLongByName() {
    if (this.model.Name) {
      this.getLatLongByLocation(this.model.Name).subscribe(response => {
        if (response && response.status == "OK") {
          this.map.location.latitude = response.results[0].geometry.location.lat;
          this.map.location.longitude = response.results[0].geometry.location.lng;
          this.model.AddressLine = response.results[0].formatted_address;
          this.model.Latitude = response.results[0].geometry.location.lat;
          this.model.Longitude = response.results[0].geometry.location.lng;
        }
      }, error => { });
    }
  }
  getLatLongByAddress() {
    if (this.model.AddressLine) {
      this.getLatLongByLocation(this.model.AddressLine).subscribe(response => {
        if (response && response.status == "OK") {
          this.map.location.latitude = response.results[0].geometry.location.lat;
          this.map.location.longitude = response.results[0].geometry.location.lng;
          this.model.Latitude = response.results[0].geometry.location.lat;
          this.model.Longitude = response.results[0].geometry.location.lng;
        }
      }, error => { });
    }
  }
}
