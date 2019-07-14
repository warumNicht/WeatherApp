import {Component, OnInit} from '@angular/core';
import {WeatherService} from '../weather.service';
import {Link} from '../link';
import {LocalStorageService} from 'angular-web-storage';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  weather: any;
  showSpinner = false;
  recent: Array<Link> = [];

  constructor(private weatherService: WeatherService, public localStorage: LocalStorageService) {
  }

  ngOnInit() {
    this.recent = this.localStorage.get('recent');
  }

  showWeather(): void {
    this.showSpinner = true;
    const cityInput = document.getElementById('city') as HTMLInputElement;
    this.fetchData(cityInput.value);
    cityInput.value = '';
    document.getElementById('forecast').setAttribute('disabled', 'true');
  }

  showRecent(viewedCity: Link): void {
    this.fetchData(viewedCity.cityName);
  }

  private fetchData(cityName: string): void {
    this.weatherService.getWeather(cityName).subscribe(res => {
      this.weather = res;
      this.showSpinner = false;
      this.addLink(cityName);
    });
  }

  private enableButton(): void {
    let forecastButton = document.getElementById('forecast');
    forecastButton.removeAttribute('disabled');
  }

  private addLink(cityName: string): void {
    let value = `${cityName} - ${new Date()}`;
    let link: Link = new Link(cityName, Date.now());

    let recentArr = this.localStorage.get('recent');
    if (!recentArr) {
      recentArr = Array<Link>();
      recentArr.push(link);
    } else {
      if (recentArr.length < 23) {
        recentArr.push(link);
      } else {
        this.leftShift(recentArr);
        recentArr[4] = link;
      }
    }
    this.localStorage.set('recent', recentArr);
    this.recent = recentArr;
  }

  private leftShift(recent: Array<Link>): void {
    for (let i = 1; i < recent.length; i++) {
      recent[i - 1] = recent[i];
    }
  }

}

