import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ota-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {
  @Input() loading: boolean;
  constructor() { }

  ngOnInit() {
  }

}
