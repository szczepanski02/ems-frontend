import { EmployeeProfileService } from '../services/employee/employee-profie.service';
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate } from "@angular/router";
import { catchError, map, Observable, of } from "rxjs";
import { IUserFromToken } from "../interfaces/IUserFromToken";
import { AuthService } from "../services/auth.service";

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private employeeProfileService: EmployeeProfileService) {};

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean>  {
    const authorities: string[] = route.data['authorities'];

    return this.validateUserToken(authorities);
  }

  employeeDataSetup(data: IUserFromToken): void {
      this.employeeProfileService.setAuthority(data.authority);
      this.employeeProfileService.setUsername(data.username);
      this.employeeProfileService.setId(data._id);
      this.employeeProfileService.setFirstname(data.firstName);
      this.employeeProfileService.setLastname(data.lastName);
  }

  validateUserToken(authorities: string[]): Observable<boolean> {
    return this.authService.isUserAuthenticated().pipe(
      map(response => {
        let hasAccess;
        this.employeeDataSetup(response.body);
        if(response.body.authority && authorities) {
          hasAccess = authorities.includes(response.body.authority);
        }
        
        if(!authorities) {
          this.authService.setIsLoggedIn(true);
          return true;
        }

        if(hasAccess) {
          this.authService.setIsLoggedIn(true);
          return true;
        };
        this.authService.removeSession();
        return false;

      }),
      catchError(() => {
        this.authService.removeSession();
        return of(false)
      })
    );
  }
  
}