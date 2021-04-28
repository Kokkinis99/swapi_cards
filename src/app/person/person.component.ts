import { ChangeDetectionStrategy, Component, Input, Output, OnInit, EventEmitter } from '@angular/core';

import { Person } from '../person';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})

export class PersonComponent implements OnInit {

  people: Person[] = [
    {
      name: 'Name',
      height: 'Height',
      homeworld: 'Homeworld',
      films: ['Films']
    },
    {
      name: 'Name',
      height: 'Height',
      homeworld: 'Homeworld',
      films: ['Films']
    }
  ];

  private _person: Person;
  private _count = 0;
  @Input() set person(value: Person){
    this._count = this._count == 0 ? 1 : 0;

    let _id = 'card_' + this._count;
    let _shId = _id + '_shake';

    if(value.name === "-1"){
      // Shake cards on 404 request
      console.log("These are not the droids you're looking for! \nMove along.");
      document.getElementById(_id).id = _shId;

      setTimeout(() => { document.getElementById(_shId).id = _id; }, 1000);

      console.log(_id, _shId);
    }else{
      // Show entity alternatively
      this._person = value;
      console.log(this._person);
      this.people[this._count%2] = this._person;
    }
  }
  constructor() { }

  ngOnInit() { }

  // public clicked() {
  //   console.log('child clicked');
  //   this.isReady.emit('child says hellooo');
  // }
}
