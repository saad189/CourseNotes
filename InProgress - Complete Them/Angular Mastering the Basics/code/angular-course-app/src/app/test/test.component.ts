import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  @Input() public parentData;

  @Output() public childEvent = new EventEmitter();
  constructor() { }

  ngOnInit() {
    console.log(this.parentData);

    this.childEvent.next('Hi Saad');
  }

}
