import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NavDrawerService } from '../nav-drawer/nav-drawer.service';

@Component({
  selector: 'app-nav-toolbar',
  templateUrl: './nav-toolbar.component.html',
  styleUrls: ['./nav-toolbar.component.scss']
})
export class NavToolbarComponent implements OnInit {

  elem: any;
  username?: string;

  constructor(
    private navDrawerService: NavDrawerService,
    private authService: AuthService
    ) { }

  ngOnInit(): void {
    this.elem = document.querySelector<HTMLElement>('.hamburger_btn');
    this.username = this.authService.getUsername();
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
