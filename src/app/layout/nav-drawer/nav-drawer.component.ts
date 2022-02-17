import { BreakpointObserver } from '@angular/cdk/layout';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawerMode, MatSidenav } from '@angular/material/sidenav';
import { NavDrawerService } from './nav-drawer.service';

@Component({
  selector: 'app-nav-drawer',
  templateUrl: './nav-drawer.component.html',
  styleUrls: ['./nav-drawer.component.scss']
})
export class NavDrawerComponent implements OnInit, AfterViewInit {

  @ViewChild(MatSidenav) sidenav!: MatSidenav;
  isOpen = true;
  drawerMode: MatDrawerMode = "side";

  constructor(
    private navDrawerService: NavDrawerService,
    private observer: BreakpointObserver
  ) { }

  ngOnInit(): void {
    this.navDrawerService.getIsOpen().subscribe(state => {
      this.isOpen = state;
    });
  }

  ngAfterViewInit(): void {
    this.observer.observe(['(max-width: 768px)']).subscribe((res) => {
      if (res.matches) {
        this.drawerMode = "over";
      } else {
        this.drawerMode = "side";
      }
    });
  }
}
