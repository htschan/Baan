import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const GEOLOCATION_ERRORS = {
  'errors.location.unsupportedBrowser': 'Browser does not support location services',
  'errors.location.permissionDenied': 'You have rejected access to your location',
  'errors.location.positionUnavailable': 'Unable to determine your location',
  'errors.location.timeout': 'Service timeout has been reached',
  'errors.undefined': 'Undefined error'
};

@Injectable({
  providedIn: 'root'
})
export class GeoLocationService {

  public getLocation(geolocationOptions?: PositionOptions): Observable<Position> {
    geolocationOptions = geolocationOptions || <PositionOptions>{ timeout: 5000 };

    return Observable.create(observer => {

      if (window.navigator && window.navigator.geolocation) {
        window.navigator.geolocation.getCurrentPosition(
          (position) => {
            observer.next(position);
            observer.complete();
          },
          (error) => {
            observer.error(this.getErrorMessage(error.code));
          },
          geolocationOptions);
      } else {
        observer.error(GEOLOCATION_ERRORS['errors.location.unsupportedBrowser']);
      }
    });
  }

  public watchPosition(geolocationOptions?: PositionOptions): Observable<Position> {
    geolocationOptions = geolocationOptions || <PositionOptions>{ timeout: 5000 };
    return Observable.create(observer => {
      if (window.navigator && window.navigator.geolocation) {
        const watchId = window.navigator.geolocation.watchPosition(
          function successHandler(loc) {
            observer.next(loc);
          },
          function errorHandler(err) {
            observer.error(this.getErrorMessage(err.code));
          },
          geolocationOptions);
        return () => {
          window.navigator.geolocation.clearWatch(watchId);
        };
      } else {
        observer.error(GEOLOCATION_ERRORS['errors.location.unsupportedBrowser']);
      }
    });
  }

  private getErrorMessage(code): string {
    switch (code) {
      case 1:
        return GEOLOCATION_ERRORS['errors.location.permissionDenied'];
      case 2:
        return GEOLOCATION_ERRORS['errors.location.positionUnavailable'];
      case 3:
        return GEOLOCATION_ERRORS['errors.location.timeout'];
      default:
        return GEOLOCATION_ERRORS['errors.undefined'];
    }
  }
}

export let geolocationServiceInjectables: Array<any> = [
  { provide: GeoLocationService, useClass: GeoLocationService }
];

// https://w3c.github.io/geolocation-api/#dom-position
export class Position {
  coords: Coordinates;
  timestamp: any;
}

export class Coordinates {
  accuracy: number;
  altitude?: number;
  altitudeAccuracy?: number;
  heading?: number;
  latitude: number;
  longitude: number;
  speed?: number;
}

// https://w3c.github.io/geolocation-api/#dom-positionoptions
export class PositionOptions {
  enableHighAccuracy = false;
  timeout = 0xFFFFFFFF; // msec, maximum length of time that is allowed to pass
  maximumAge = 0; // 0 = immediately aquire a position, otherwise return cached position
}