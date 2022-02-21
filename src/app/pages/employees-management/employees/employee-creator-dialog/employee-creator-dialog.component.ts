import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employee-creator-dialog',
  templateUrl: './employee-creator-dialog.component.html',
  styleUrls: ['./employee-creator-dialog.component.scss']
})
export class EmployeeCreatorDialogComponent implements OnInit {

  firstNameValue = '';
  lastNameValue = '';
  usernameValue = '';
  passwordValue = '';
  repeatPasswordValue = '';
  authorityValue = 'moderator';
  emailValue = '';

  constructor() { }

  ngOnInit(): void {
  }

}
