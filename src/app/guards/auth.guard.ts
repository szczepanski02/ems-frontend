import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { catchError, map, Observable, of } from "rxjs";
import { AuthService } from "../services/auth.service";

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) {};

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>  {
    const authorities: string[] = route.data['authorities'];

    return this.validateUserToken(authorities);
  }

  validateUserToken(authorities: string[]): Observable<boolean> {
    return this.authService.isUserAuthenticated().pipe(
      map(response => {
        let hasAccess;
        this.authService.setUsername(response.body.username);
        this.authService.setRole(response.body.role);
        if(response.body.role && authorities) {
          hasAccess = authorities.includes(response.body.role);
        }
        
        if(!authorities) {
          this.authService.setIsLoggedIn(true);
          return true;
        }

        if(hasAccess) {
          this.authService.setIsLoggedIn(true);
          return true;
        };
        this.router.navigate(['login']);
        this.authService.removeSession();
        this.authService.setIsLoggedIn(false);
        return false;
      }),
      catchError(() => {
        this.router.navigate(['login']);
        this.authService.removeSession();
        this.authService.setIsLoggedIn(false);
        return of(false)
      })
    );
  }
  
}