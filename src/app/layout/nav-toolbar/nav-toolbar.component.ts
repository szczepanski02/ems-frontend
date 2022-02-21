import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { NavDrawerService } from '../nav-drawer/nav-drawer.service';

@Component({
  selector: 'app-nav-toolbar',
  templateUrl: './nav-toolbar.component.html',
  styleUrls: ['./nav-toolbar.component.scss']
})
export class NavToolbarComponent implements OnInit {

  elem: any;
  firstName?: string;
  lastName?: string;

  constructor(
    private navDrawerService: NavDrawerService,
    private employeeService: EmployeeService
    ) { }

  ngOnInit(): void {
    this.elem = document.querySelector<HTMLElement>('.hamburger_btn');
    this.firstName = this.employeeService.getFirstname();
    this.lastName = this.employeeService.getLastname();

    if(!this.navDrawerService.getState()) {
      this.navDrawerService.setIsOpen(!this.navDrawerService.getState());
    }
  }

  changeDrawerNavState(): void {
    this.navDrawerService.setIsOpen(!this.navDrawerService.getState());
    this.changeHamburgerState();
  }

  changeHamburgerState(): void {
    if(!this.elem) return;
    if(this.navDrawerService.getState()) {
      this.elem.classList.add('opened');
    } else {
      this.elem.classList.remove('opened');
    }
  }

}
