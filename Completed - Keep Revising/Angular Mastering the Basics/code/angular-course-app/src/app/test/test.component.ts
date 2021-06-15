import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { IEmployee } from '../Models/employee';
import { TestService } from '../test.service';


@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  @Input() public parentData;
  public employeeList: IEmployee[];
  @Output() public childEvent = new EventEmitter();

  constructor(private testService: TestService) { }

  ngOnInit() {
    console.log(this.parentData);
    this.testService.getEmployees().subscribe(data => this.employeeList = data);
    this.childEvent.next('Hi Saad');
  }

}
