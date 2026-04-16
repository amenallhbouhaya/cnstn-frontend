import { Component, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { PLATFORM_ID } from '@angular/core';
import { finalize } from 'rxjs';

import { AppNotification, NotificationsApi } from '../../core/services/notifications';

@Component({
  selector: 'app-notifications-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notifications-page.html',
  styleUrl: './notifications-page.css'
})
export class NotificationsPageComponent {
  private api = inject(NotificationsApi);
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);

  items: AppNotification[] = [];
  loading = false;
  errorMsg = '';

  ngOnInit() {
    if (!isPlatformBrowser(this.platformId)) return;
    this.load();
  }

  load() {
    this.loading = true;
    this.errorMsg = '';

    this.api.my()
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: (data) => this.items = data ?? [],
        error: (err) => {
          console.log(err);
          this.errorMsg = 'Erreur chargement notifications';
        }
      });
  }

  open(notification: AppNotification) {
    const go = () => this.router.navigateByUrl(notification.targetPath || '/');

    if (notification.lu) {
      go();
      return;
    }

    this.api.markRead(notification.id).subscribe({
      next: () => {
        notification.lu = true;
        go();
      },
      error: () => go()
    });
  }

  markAllAsRead() {
    this.api.markAllRead().subscribe({
      next: () => {
        this.items = this.items.map((item) => ({ ...item, lu: true }));
      },
      error: (err) => console.log(err)
    });
  }
}
