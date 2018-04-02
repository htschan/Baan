import { Component, ViewChild, OnInit } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { } from '@types/googlemaps';
import { GeoLocationService, Position, PositionOptions } from '../../services/geolocation.service';

/*
https://github.com/ultrasonicsoft/gmap-geolocation-demo
*/

@IonicPage()
@Component({
  selector: 'page-gpspage',
  templateUrl: 'gpspage.html',
})
export class GpspagePage implements OnInit {
  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;

  isTracking = false;

  currentLat: any;
  currentLong: any;

  marker: google.maps.Marker;

  geoLocation: Position;
  watchLocation: Position;

  constructor(public geoLocationService: GeoLocationService) {
    geoLocationService.getLocation().subscribe(data => {
      this.geoLocation = data;
    },
      err => {
        console.log("getLocation Error: " + err)
      });
    geoLocationService.watchPosition(new PositionOptions()).subscribe(data => {
      this.watchLocation = data;
    },
      err => {
        console.log("watchPosition Error: " + err)
      });
  }

  ngOnInit() {
    var mapProp = {
      center: new google.maps.LatLng(8.7533595, 47.4887965),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
  }

  findMe() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.showPosition(position);
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  showPosition(position) {
    this.currentLat = position.coords.latitude;
    this.currentLong = position.coords.longitude;

    let location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    this.map.panTo(location);

    if (!this.marker) {
      this.marker = new google.maps.Marker({
        position: location,
        map: this.map,
        title: 'Got you!'
      });
    }
    else {
      this.marker.setPosition(location);
    }
  }

  trackMe() {
    if (navigator.geolocation) {
      this.isTracking = true;
      navigator.geolocation.watchPosition((position) => {
        this.showTrackingPosition(position);
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  showTrackingPosition(position) {
    console.log(`tracking postion:  ${position.coords.latitude} - ${position.coords.longitude}`);
    this.currentLat = position.coords.latitude;
    this.currentLong = position.coords.longitude;

    let location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    this.map.panTo(location);

    if (!this.marker) {
      this.marker = new google.maps.Marker({
        position: location,
        map: this.map,
        title: 'Got you!'
      });
    }
    else {
      this.marker.setPosition(location);
    }
  }
}
