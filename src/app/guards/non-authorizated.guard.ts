import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { ToastMessageService } from "../shared/reusable-components/toast-message/toast-message.service";
import { toastMessageType } from "../shared/constants/toastMessageType";

@Injectable({ providedIn: 'root' })
export class NonAuthorizatedGuard implements CanActivate {

  constructor(private router: Router, private toastMessageService: ToastMessageService) {};

  canActivate(): boolean  {
    if(localStorage.getItem('access_token')) {
      this.router.navigate(['/']);
      this.toastMessageService.setMessage('Authorization', 'You are already logged in', toastMessageType.WARN, 5);
      return false;
    }
    return true;
  }

}