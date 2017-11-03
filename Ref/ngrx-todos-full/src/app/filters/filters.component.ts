import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from "@angular/forms";

@Component({
  selector: 'filters',
  template: `
    <div><select [formControl]="filter" (change)="changeFilter.next(filter.value)">
      <option *ngFor="let filter of filters" [ngValue]="filter.id">{{filter.title}}</option>
    </select></div>
   `
})
export class FiltersComponent {
  @Input() filters;
  @Output() changeFilter = new EventEmitter<any>();
  filter : FormControl;

  constructor() {
    this.filter = new FormControl();
  }

  @Input() set active( val ) {
    console.log(val);
    this.filter.setValue(val);
  }

}
