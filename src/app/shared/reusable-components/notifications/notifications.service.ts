import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  public notification$: Subject<{ notification: string, alertType: string }> = new Subject();
  
  constructor() { }

  setNotification(notification: string, alertType: string): void {
    this.notification$.next({ notification, alertType });
  }

  getNotification(): Observable<{ notification: string, alertType: string }> {
    return this.notification$.asObservable();
  }

}
