// navbar-visibility.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NavbarVisibilityService {
  private visible = new BehaviorSubject<boolean>(true);
  navbarVisible$ = this.visible.asObservable();

  show() { this.visible.next(true); }
  hide() { this.visible.next(false); }
}
