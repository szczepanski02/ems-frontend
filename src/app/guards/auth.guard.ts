import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { catchError, map, Observable, of } from "rxjs";
import { IUserFromToken } from "../interfaces/IUserFromToken";
import { AuthService } from "../services/auth.service";
import { EmployeeService } from "../services/employee/employee.service";

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService, private employeeService: EmployeeService) {};

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>  {
    const authorities: string[] = route.data['authorities'];

    return this.validateUserToken(authorities);
  }

  employeeDataSetup(data: IUserFromToken): void {
      this.employeeService.setRole(data.role);
      this.employeeService.setUsername(data.username);
      this.employeeService.setId(data._id);
      this.employeeService.setFirstname(data.first_name);
      this.employeeService.setLastname(data.last_name);
  }

  validateUserToken(authorities: string[]): Observable<boolean> {
    return this.authService.isUserAuthenticated().pipe(
      map(response => {
        let hasAccess;
        this.employeeDataSetup(response.body);
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