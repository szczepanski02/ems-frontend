import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDrawer, MatDrawerMode, MatSidenav } from '@angular/material/sidenav';
import { Subscription } from 'rxjs';
import { WindowSizeService } from 'src/app/services/window-size.service';
import { NavDrawerService } from './nav-drawer.service';

@Component({
  selector: 'app-nav-drawer',
  templateUrl: './nav-drawer.component.html',
  styleUrls: ['./nav-drawer.component.scss']
})
export class NavDrawerComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(MatDrawer) drawer!: MatDrawer;
  isOpen = true;
  drawerMode: MatDrawerMode = 'side';
  drawerSubscription?: Subscription;
  windowSizeSubscription?: Subscription;

  constructor(
    private navDrawerService: NavDrawerService,
    private windowSizeService: WindowSizeService
  ) { }

  ngOnInit(): void {
    this.navDrawerService.getIsOpen().subscribe(state => {
      this.isOpen = state;
    });
    this.windowSizeService.getSize().subscribe(state => {
      if(state.width > 768) {
        this.drawerMode = 'side';
      } else {
        this.drawerMode = 'over';
      }
    });
  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
    this.windowSizeSubscription?.unsubscribe();
    this.drawerSubscription?.unsubscribe();
  }

}
