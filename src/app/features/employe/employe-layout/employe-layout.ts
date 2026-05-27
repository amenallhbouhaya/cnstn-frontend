import {
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  ViewChild,
  inject
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../core/services/auth';
import { AppNotification, NotificationsApi } from '../../../core/services/notifications';
import { UserMeApi } from '../../../core/services/user-me-api';
import { Subject, interval, of } from 'rxjs';
import { catchError, startWith, switchMap, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-employe-layout',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './employe-layout.html',
  styleUrl: './employe-layout.css'
})
export class EmployeLayoutComponent implements OnInit, OnDestroy {
  private auth = inject(AuthService);
  private router = inject(Router);
  private notificationsApi = inject(NotificationsApi);
  private userMeApi = inject(UserMeApi);
  private destroy$ = new Subject<void>();
  private platformId = inject(PLATFORM_ID);

  @ViewChild('notifWrapper') notifWrapper?: ElementRef<HTMLElement>;

  unreadCount = 0;
  notifMenuOpen = false;
  notifLoading = false;
  notifError = '';
  notifications: AppNotification[] = [];

  userDisplayName = 'Mon compte';
  userInitials = 'MC';
  userPhotoUrl: string | null = null;

  // Initializes the component and loads its first data.
  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.loadCurrentUser();
    this.loadCurrentUserPhoto();

    interval(20000)
      .pipe(
        startWith(0),
        switchMap(() => this.notificationsApi.unreadCount()),
        catchError(() => of({ count: 0 })),
        takeUntil(this.destroy$)
      )
      .subscribe((res) => {
        this.unreadCount = res?.count ?? 0;

        if (this.notifMenuOpen) {
          this.loadNotifications(false);
        }
      });
  }

  // Cleans up subscriptions and browser resources before destruction.
  ngOnDestroy(): void {
    if (this.userPhotoUrl) {
      URL.revokeObjectURL(this.userPhotoUrl);
    }

    this.destroy$.next();
    this.destroy$.complete();
  }

  // Closes the notification menu when the user clicks outside it.
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.notifMenuOpen || !this.notifWrapper) return;

    const target = event.target as Node | null;
    if (target && !this.notifWrapper.nativeElement.contains(target)) {
      this.notifMenuOpen = false;
    }
  }

  // Closes the notification menu when Escape is pressed.
  @HostListener('document:keydown.escape')
  onEscapeKey(): void {
    this.notifMenuOpen = false;
  }

  // Toggles the notification menu and loads the list when opening it.
  toggleNotifications(event: MouseEvent): void {
    event.stopPropagation();
    this.notifMenuOpen = !this.notifMenuOpen;

    if (this.notifMenuOpen) {
      this.loadNotifications(true);
    }
  }

  // Refreshes the notifications list and loading state.
  loadNotifications(showLoader = true): void {
    if (showLoader) {
      this.notifLoading = true;
    }

    this.notifError = '';

    this.notificationsApi.my()
      .pipe(
        catchError(() => {
          this.notifError = 'Impossible de charger les notifications';
          return of([] as AppNotification[]);
        })
      )
      .subscribe((items) => {
        this.notifications = items ?? [];
        this.notifLoading = false;
      });
  }

  // Opens the selected notification and marks it as read when needed.
  openNotification(item: AppNotification): void {
    const targetPath = item.targetPath || '/employe/notifications';
    const go = () => {
      this.notifMenuOpen = false;
      this.router.navigateByUrl(targetPath);
    };

    if (item.lu) {
      go();
      return;
    }

    this.notificationsApi.markRead(item.id).subscribe({
      next: () => {
        item.lu = true;
        this.unreadCount = Math.max(0, this.unreadCount - 1);
        go();
      },
      error: () => go()
    });
  }

  // Marks every notification as read.
  markAllNotificationsRead(event: MouseEvent): void {
    event.stopPropagation();

    this.notificationsApi.markAllRead().subscribe({
      next: () => {
        this.notifications = this.notifications.map((n) => ({ ...n, lu: true }));
        this.unreadCount = 0;
      },
      error: () => {
        this.notifError = 'Impossible de marquer les notifications';
      }
    });
  }

  // Navigates to the full notifications page.
  openAllNotifications(event: MouseEvent): void {
    event.stopPropagation();
    this.notifMenuOpen = false;
    this.router.navigate(['/employe/notifications']);
  }

  // Handles the notificationPreview flow for the current screen.
  get notificationPreview(): AppNotification[] {
    return this.notifications.slice(0, 6);
  }

  // Loads the current user profile for the layout header.
  private loadCurrentUser(): void {
    this.userMeApi.me().subscribe({
      next: (me) => {
        const nom = (me.nom ?? '').trim();
        const prenom = (me.prenom ?? '').trim();
        const fullName = `${prenom} ${nom}`.trim();

        this.userDisplayName = fullName || 'Mon compte';
        this.userInitials = this.buildInitials(prenom, nom);
      },
      error: () => {
        this.userDisplayName = 'Mon compte';
        this.userInitials = 'MC';
      }
    });
  }

  // Loads the profile photo and creates a browser object URL.
  private loadCurrentUserPhoto(): void {
    this.userMeApi.getPhoto().subscribe({
      next: (blob) => {
        if (this.userPhotoUrl) {
          URL.revokeObjectURL(this.userPhotoUrl);
        }

        this.userPhotoUrl = URL.createObjectURL(blob);
      },
      error: () => {
        this.userPhotoUrl = null;
      }
    });
  }

  // Builds fallback initials when no profile photo is available.
  private buildInitials(prenom: string, nom: string): string {
    const first = prenom.charAt(0).toUpperCase();
    const last = nom.charAt(0).toUpperCase();
    const initials = `${first}${last}`.trim();

    return initials || 'MC';
  }

  // Clears the current session and returns to the public home page.
  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }
}
