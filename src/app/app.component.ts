import { Component } from '@angular/core';
import { environment} from '../environments/environment'

export interface IWeather {
  sol_keys: string[];
}

export class WeeklyWeather {
  primarySolNumber: number;
  primarySolDate: string;
  primarySolSeason: string;
  sol: ISol[];

  constructor(data: IWeather) {
    const sols = data.sol_keys.map((k) => {
      const sol: ISol = data[k];
      sol.id = parseInt(k);
      sol.PRE.mx = parseInt(k);
      console.log('Sol:', sol);
      return sol;
    });

    const first = sols
      .sort((a: ISol, b: ISol) => b.id - a.id)
      .find((x: ISol) => true);

    this.primarySolNumber = first.id;
    this.primarySolDate = first.First_UTC;
    this.primarySolSeason = first.Season;
  }
}

export interface ISol {
  id: number;
  First_UTC: string;
  Season: string;
  PRE: IWeatherData;
}

export interface IWeatherData {
  av: number;
  ct: number;
  mn: number;
  mx: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Mars Weather';
  api = environment;

  constructor() {}
  weather: WeeklyWeather;

  ngOnInit(): void {
    fetch(this.api.baseURL)
      .then((response) => response.json())
      .then((json) => {
        const weatherData: IWeather = json;
        this.weather = new WeeklyWeather(weatherData);
        console.log(weatherData);
      })
      .catch((err) => console.log(err));
  }
}
