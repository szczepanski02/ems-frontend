import { Component, Input, OnInit } from '@angular/core';
import { IAuthorizatedEmployee } from '../../../interfaces/IAuthorizatedEmployee';

@Component({
  selector: 'app-employee-profile-previewer',
  templateUrl: './employee-profile-previewer.component.html',
  styleUrls: ['./employee-profile-previewer.component.scss']
})
export class EmployeeProfilePreviewerComponent implements OnInit {

  @Input() employee!: IAuthorizatedEmployee;

  constructor() { }

  ngOnInit(): void {
    if(!this.employee) {
      this.employee = {
        firstName: 'unknown', lastName: 'unknown', authority: undefined, email: 'unknown', username: 'unknown'
      }
    }

    if(!this.employee.firstName) {
      this.employee.firstName = 'unknown';
    }
    if(!this.employee.lastName) {
      this.employee.lastName = 'unknown';
    }
    if(!this.employee.authority) {
      this.employee.authority = undefined;
    }
    if(!this.employee.email) {
      this.employee.email = 'unknown'
    }
    if(!this.employee.username) {
      this.employee.username = 'unknown'
    }

  }

}
