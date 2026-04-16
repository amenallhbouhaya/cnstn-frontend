import { Component, OnDestroy, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser, NgIf } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Subject, interval, of } from 'rxjs';
import { catchError, startWith, switchMap, takeUntil } from 'rxjs/operators';

import { AuthService } from '../../../core/services/auth';
import { NotificationsApi } from '../../../core/services/notifications';

@Component({
  selector: 'app-chef-layout',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet, NgIf],
  templateUrl: './chef-layout.html',
  styleUrl: './chef-layout.css'
})
export class ChefLayoutComponent implements OnInit, OnDestroy {
  private auth = inject(AuthService);
  private router = inject(Router);
  private notificationsApi = inject(NotificationsApi);
  private platformId = inject(PLATFORM_ID);
  private destroy$ = new Subject<void>();

  unreadCount = 0;

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    interval(20000)
      .pipe(
        startWith(0),
        switchMap(() => this.notificationsApi.unreadCount()),
        catchError(() => of({ count: 0 })),
        takeUntil(this.destroy$)
      )
      .subscribe((res) => {
        this.unreadCount = res?.count ?? 0;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }
}
