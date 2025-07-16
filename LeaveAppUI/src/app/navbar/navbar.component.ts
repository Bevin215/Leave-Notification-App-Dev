import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, Event as RouterEvent } from '@angular/router';
import { NavbarVisibilityService } from '../Services/navbar-visibility.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {
  isVisible = true;
  currentRoute = '';

  constructor(
    private router: Router,
    private navService: NavbarVisibilityService
  ) {}

  ngOnInit() {
    // Listen to router events and check for NavigationEnd inside the subscribe
    this.router.events.subscribe((event: RouterEvent) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.urlAfterRedirects;
        this.updateVisibility();
      }
    });

    this.navService.navbarVisible$.subscribe((visible) => {
      this.isVisible = visible;
      this.updateVisibility();
    });
  }
  updateVisibility() {
    this.isVisible =
      this.navService['visible'].getValue() &&
      !['/homepage', '/success'].includes(this.currentRoute);
  }
}
