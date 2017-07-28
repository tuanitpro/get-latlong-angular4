import { Component, OnInit } from '@angular/core';

import { Http, HttpModule, Headers, Response, RequestOptions, RequestMethod } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { GoogleMapsAPIWrapper } from '@agm/core';
import { MapsAPILoader } from '@agm/core';
declare var google: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  title = 'app';
  public resources: any = {
    name: 'Location Name',
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

  public model: any = {
    Name: 'Chợ Bến Thành',
    AddressLine: 'Đường Lê Lợi, Bến Thành, Quận 1, Hồ Chí Minh, Vietnam',
    Latitude: 10.7728067,
    Longitude: 106.6997623
  };
  public locationList = new Array();

  constructor(private http: Http) {
    this.locationList.push({
      AddressLine: 'Đường Lê Lợi, Bến Thành, Quận 1, Hồ Chí Minh, Vietnam',
      Latitude: 10.7728067,
      Longitude: 106.6997623
    });
    this.locationList.push({
      AddressLine: '1, Công xã Paris, Bến Nghé, Quận 1, Hồ Chí Minh, Vietnam',
      Latitude: 10.7793131,
      Longitude: 106.6990862
    });
  }
  getLatLongByLocation(address: string) {
    const geocoder = new google.maps.Geocoder();
    return Observable.create(observer => {
      geocoder.geocode({ 'address': address }, function (results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
          // observer.next(results[0].geometry.location);
          observer.next(results[0]);
          observer.complete();
        } else {
          console.log('Error - ', results, ' & Status - ', status);
          observer.next({});
          observer.complete();
        }
      });
    })
  }


  private getAddressByLatLong(lat: number, long: number): Observable<any> {
    const geocoder = new google.maps.Geocoder();
    const latlng = { lat: lat, lng: long };
    return Observable.create(observer => {
      geocoder.geocode({ 'location': latlng }, function (results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
          // observer.next(results[0].geometry.location);
          observer.next(results[0]);
          observer.complete();
        } else {
          console.log('Error - ', results, ' & Status - ', status);
          observer.next({});
          observer.complete();
        }
      });
    })
  }
  getLatLongByName() {
    if (this.model.Name) {
      this.getLatLongByLocation(this.model.Name).subscribe(response => {
        console.log(response.geometry.location);
        if (response) {
          this.map.location.latitude = response.geometry.location.lat();
          this.map.location.longitude = response.geometry.location.lng();
          this.model.AddressLine = response.formatted_address;
          this.model.Latitude = response.geometry.location.lat();
          this.model.Longitude = response.geometry.location.lng();
        }
      }, error => { });
    }
  }
  getLatLongByAddress() {
    if (this.model.AddressLine) {
      this.getLatLongByLocation(this.model.AddressLine).subscribe(response => {
        if (response) {
          this.map.location.latitude = response.geometry.location.lat();
          this.map.location.longitude = response.geometry.location.lng();
          this.model.Latitude = response.geometry.location.lat();
          this.model.Longitude = response.geometry.location.lng();
        }
      }, error => { });
    }
  }
  mapClicked($event) {

    // lat: $event.coords.lat,
    // lng: $event.coords.lng
    if ($event) {
      const lat = $event.coords.lat;
      const lng = $event.coords.lng;

      this.model.Latitude = lat;
      this.model.Longitude = lng;

      // this.map.location.latitude = lat;
      // this.map.location.longitude =lng;
      this.getAddressByLatLong($event.coords.lat, $event.coords.lng).subscribe(response => {
        if (response) {

          const address = response.formatted_address;
          this.model.AddressLine = address;
          this.model.Name = '';
          this.locationList.push({
            AddressLine: address,
            Latitude: lat,
            Longitude: lng
          });
        }
      }, error => { });

    }
  }
}

