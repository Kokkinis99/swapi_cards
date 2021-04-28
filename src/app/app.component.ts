import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Person } from './person';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-swapi';
  myValue = "hello";
  person = {name: "Name", height: "Height", homeworld: "Homeworld", films: "Films"};

  constructor(private _httpClient: HttpClient) {}

  getPerson(value: string): void{
    this._httpClient.get<{results: any[]}>(`https://swapi.dev/api/people/?search=${value}`).pipe(
      map(response => {
        const obj = response.results[0];
        if(response.results[0] === undefined){
          return {
            name: "-1",
            height: "-1",
            homeworld: "-1",
            films: ['-1']
          }
        }

        return {
          name: obj.name,
          height: obj.height,
          homeworld: obj.homeworld,
          films: obj.films
        }
      })
    ).subscribe(v => {
      this.person = v;
      console.log(this.person);

      console.log(v.homeworld);
      this._httpClient.get<{results: any[]}>(`${v.homeworld}`).
        subscribe(v => { this.person.homeworld = v["name"] } );
    });
  }

}
