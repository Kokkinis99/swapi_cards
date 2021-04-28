import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

import { debounceTime, map, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Person } from '../person';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  entity: FormControl;
  person: Person;

  @Input() public initialValue;
  @Output() public searchValue = new EventEmitter<string>();

  constructor(private _httpClient: HttpClient) { }

  ngOnInit(): void {
    console.log(this.initialValue);
    this.entity = new FormControl('');
    this.entity.valueChanges.pipe(
      debounceTime(300),
      // switchMap(entity => this._httpClient.get<{results: any[]}>(`https://swapi.dev/api/people/?search=${entity}`)),
      // map(response => {
      //   const obj = response.results[0];
      //   return {
      //     name: obj.name,
      //     height: obj.height
      //   }
      // })
      ).subscribe(v => this.searchValue.next(v));
  }
}
