import { Component, OnDestroy, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NgIf } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../core/services/auth';
import { NotificationsApi } from '../../../core/services/notifications';
import { Subject, interval, of } from 'rxjs';
import { catchError, startWith, switchMap, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-rsec-layout',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet, NgIf],
  templateUrl: './rsec-layout.html',
  styleUrl: './rsec-layout.css'
})
export class RsecLayoutComponent implements OnInit, OnDestroy {
  private auth = inject(AuthService);
  private router = inject(Router);
  private notificationsApi = inject(NotificationsApi);
  private destroy$ = new Subject<void>();
  private platformId = inject(PLATFORM_ID);

  unreadCount = 0;

  // Initializes the component and loads its first data.
  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

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

  // Cleans up subscriptions and browser resources before destruction.
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // Clears the current session and returns to the public home page.
  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }
}