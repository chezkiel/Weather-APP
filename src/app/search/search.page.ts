import { Component } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

const API_URL = environment.API_URL;
const API_KEY = environment.API_KEY;

interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string; 
}

interface WeatherResponse {
  main: {
    temp: number;
    temp_min?: number;
    temp_max?: number;
    humidity?: number;
  };
  name: string; 
  weather: Weather[];
}

@Component({
  selector: 'app-search',
  templateUrl: 'search.page.html',
  styleUrls: ['search.page.scss'],
})
export class SearchPage {
  weatherTemp: any;
  todayDate = new Date();
  cityName = "";
  weatherIcon: any; 
  weatherDetails: Weather | null = null;
  weatherMain: string | undefined;
  name="";
  loading = true;

  constructor(public httpClient: HttpClient) {
    // this.loadData();
  }

  loadData() {
    this.httpClient.get<WeatherResponse>(`${API_URL}/weather?q=${this.cityName}&appid=${API_KEY}`)
      .subscribe(results => {
        console.log(results);
        this.weatherTemp = results.main;
        this.name = results.name;

        if (results.weather && results.weather.length > 0) {
          this.weatherDetails = results.weather[0];
          this.weatherMain = this.weatherDetails.main;
          this.weatherIcon = `https://openweathermap.org/img/wn/${this.weatherDetails.icon}@4x.png`;
        }

        this.loading = false

        console.log(this.weatherTemp);
        console.log(this.cityName);
        console.log(this.weatherDetails);
      });
  }
}
