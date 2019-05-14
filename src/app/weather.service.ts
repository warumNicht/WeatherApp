import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {Router} from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  configUrl = 'http://api.apixu.com/v1/forecast.json?key=29d83fa2298a47d29bb121845161212&q=';
  constructor(private http: HttpClient, private router: Router) {
  }

  getWeather(city: string) {
    return this.http.get(this.configUrl + city + '&days=2');
  }
}
