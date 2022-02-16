import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) {};

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    
    if(!localStorage.getItem('access_token')) {
      this.router.navigate(['login']);
      return false;
    }

    if(await this.authService.isUserAuthenticated()) {
      return true;
    }

    this.router.navigate(['login']);
    return false;
  }
  
}