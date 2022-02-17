import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavDrawerService {

  private isOpen: Subject<boolean> = new BehaviorSubject<boolean>(true);
  private state = true;

  constructor() { }

  setIsOpen(state: boolean): void {
    this.state = state;
    this.isOpen.next(state);
  }

  getIsOpen(): Observable<boolean> {
    return this.isOpen.asObservable();
  }

  getState(): boolean {
    return this.state;
  }

}
