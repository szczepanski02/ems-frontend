import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router"
import { catchError, map, Observable, of } from "rxjs";
import { AuthService } from "../services/auth.service";

@Injectable()
export class LoggedOutAuthGuard implements CanActivate {

    constructor(private router: Router, private authService: AuthService) { }

    canActivate(): Observable<boolean> {
      return this.validateUserToken();
    }

    validateUserToken(): Observable<boolean> {
      return this.authService.isUserAuthenticated().pipe(
        map(() => {
          this.router.navigate(['/']);
          return false;
        }),
        catchError(() => {
          this.authService.removeSession();
          return of(true)
        })
      );
    }

}