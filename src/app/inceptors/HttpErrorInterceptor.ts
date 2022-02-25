import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, of } from "rxjs";
import { AuthService } from "../services/auth.service";
import { toastMessageType } from "../shared/constants/toastMessageType";
import { ToastMessageService } from "../shared/reusable-components/toast-message/toast-message.service";
import { Router } from "@angular/router";

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  
  constructor(private authService: AuthService, private toastMessageService: ToastMessageService, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        if(err.status === 401) {
          if(this.router.url === '/login') {
            this.toastMessageService.setMessage('Authorization', err.error.message, toastMessageType.ERROR, 5);
            return of(true);
          }
          this.authService.removeSession(true);
          this.toastMessageService.setMessage('Authorization', 'Please sign in to continue', toastMessageType.ERROR, 5);
          return of(true)
        }
        if(err.status === 403) {
          this.toastMessageService.setMessage('Error', 'You are not authorized to perform this operation', toastMessageType.ERROR, 5);
        }
        if(err.error.message && (err.status !== 403 && err.status !== 401)) {
          this.toastMessageService.setMessage('Error', err.error.message, toastMessageType.ERROR, 5);
        }
        return of(false)
      })
    )
  }

}