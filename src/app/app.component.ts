import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from './services/auth.service';
import { WindowSizeService } from './services/window-size.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  
  isLoadingSpinnerActive = false;
  isLoggedInSubscription?: Subscription;
  isLoggedIn = false;
   
  constructor(
    private router: Router,
    private authService: AuthService,
    private windowSizeService: WindowSizeService
  ) {}

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
          this.isLoadingSpinnerActive = true;

      } else if ( event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError) {
        this.isLoadingSpinnerActive = false;
      }
      }, () => {
        this.isLoadingSpinnerActive = false;
    });

    this.isLoggedInSubscription = this.authService.getIsLoggedIn().subscribe(state => {
      this.isLoggedIn = state;
    });
  }

  ngOnDestroy(): void {
    this.isLoggedInSubscription?.unsubscribe();
  }

  @HostListener('window:resize', ['$event'])
  onWindowResized(event: any) {
    this.windowSizeService.resized({ width: event.target.innerWidth, height: event.target.innerHeight });
  }

}
function buildRouteTransition(arg0: { stateChangeExpr: string; enter: any; leave: any; }): import("@angular/animations").AnimationMetadata {
  throw new Error('Function not implemented.');
}

