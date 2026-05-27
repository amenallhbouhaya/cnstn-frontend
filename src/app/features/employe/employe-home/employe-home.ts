import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { forkJoin, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { DocumentApi } from '../../../core/services/document-api';
import { EmployeEvenementApi } from '../../../core/services/employe-evenement-api';
import { InterventionApi, InterventionDto } from '../../../core/services/intervention-api';
import { AppNotification, NotificationsApi } from '../../../core/services/notifications';
import { UserMeApi } from '../../../core/services/user-me-api';
import { interventionStatusLabel, isInterventionBlockingStatus } from '../../../core/models/intervention-status';

interface HomeMetric {
  label: string;
  value: number;
  hint: string;
  route: string;
}

interface AgendaItem {
  title: string;
  date: Date;
  meta: string;
  route: string;
}

interface ActivityItem {
  title: string;
  date: Date;
  tag: string;
  route: string;
}

@Component({
  selector: 'app-employe-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './employe-home.html',
  styleUrl: './employe-home.css'
})
export class EmployeHomeComponent implements OnInit {
  private evenementsApi = inject(EmployeEvenementApi);
  private interventionApi = inject(InterventionApi);
  private notificationsApi = inject(NotificationsApi);
  private documentsApi = inject(DocumentApi);
  private userMeApi = inject(UserMeApi);
  private platformId = inject(PLATFORM_ID);

  private readonly seenDocsKey = 'employe_seen_doc_ids';

  loading = false;
  userFirstName = 'Employe';

  metrics: HomeMetric[] = [];
  agenda: AgendaItem[] = [];
  activities: ActivityItem[] = [];

  activeInterventionsCount = 0;
  unreadNotificationsCount = 0;
  newDocsCount = 0;

  // Initializes the component and loads its first data.
  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.loadDashboard();
  }

  // Loads the dashboard metrics and charts.
  loadDashboard(): void {
    this.loading = true;

    forkJoin({
      me: this.userMeApi.me().pipe(catchError(() => of(null))),
      events: this.evenementsApi.myEvents().pipe(catchError(() => of([] as any[]))),
      interventions: this.interventionApi.my().pipe(catchError(() => of([] as InterventionDto[]))),
      notifications: this.notificationsApi.my().pipe(catchError(() => of([] as AppNotification[]))),
      documents: this.documentsApi.myDocs().pipe(catchError(() => of([] as any[])))
    })
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(({ me, events, interventions, notifications, documents }) => {
        const safeEvents = events ?? [];
        const safeInterventions = interventions ?? [];
        const safeNotifications = notifications ?? [];
        const safeDocuments = documents ?? [];

        this.userFirstName = (me?.prenom ?? '').trim() || 'Employe';
        this.activeInterventionsCount = safeInterventions.filter((item) => this.isInterventionActive(item?.statut)).length;
        this.unreadNotificationsCount = safeNotifications.filter((item) => !item?.lu).length;

        const eventsThisMonth = safeEvents.filter((event) => this.isDateInCurrentMonth(this.toDate(event?.dateDebut))).length;
        const newDocsCount = this.computeNewDocumentsCount(safeDocuments);
        this.newDocsCount = newDocsCount;

        this.metrics = [
          {
            label: 'Evenements ce mois',
            value: eventsThisMonth,
            hint: 'Votre planification actuelle',
            route: '/employe/evenements'
          },
          {
            label: 'Interventions actives',
            value: this.activeInterventionsCount,
            hint: 'Demandes en attente ou en cours',
            route: '/employe/interventions'
          },
          {
            label: 'Notifications non lues',
            value: this.unreadNotificationsCount,
            hint: 'Mises a jour recentes',
            route: '/employe/notifications'
          },
          {
            label: 'Nouveaux documents',
            value: newDocsCount,
            hint: 'Documents pas encore consultes',
            route: '/employe/documents'
          }
        ];

        this.agenda = this.buildAgenda(safeEvents);
        this.activities = this.buildActivities(safeEvents, safeInterventions, safeNotifications);
      });
  }

  // Provides a stable trackBy key for list rendering.
  trackByMetric(_index: number, metric: HomeMetric): string {
    return metric.label;
  }

  // Provides a stable trackBy key for list rendering.
  trackByAgenda(_index: number, item: AgendaItem): string {
    return `${item.title}-${item.date.getTime()}`;
  }

  // Provides a stable trackBy key for list rendering.
  trackByActivity(_index: number, item: ActivityItem): string {
    return `${item.tag}-${item.date.getTime()}`;
  }

  // Builds the upcoming agenda view from raw events.
  private buildAgenda(events: any[]): AgendaItem[] {
    const now = Date.now();

    return events
      .map((event) => ({
        title: String(event?.titre ?? 'Evenement'),
        date: this.toDate(event?.dateDebut),
        meta: String(event?.typeEvenement ?? 'Planification'),
        route: '/employe/evenements'
      }))
      .filter((item): item is AgendaItem => !!item.date)
      .filter((item) => item.date.getTime() >= now)
      .sort((a, b) => a.date.getTime() - b.date.getTime())
      .slice(0, 5);
  }

  // Builds the activity feed from events, interventions, and notifications.
  private buildActivities(events: any[], interventions: InterventionDto[], notifications: AppNotification[]): ActivityItem[] {
    const eventsActivity = events
      .map((event) => ({
        title: `Evenement: ${String(event?.titre ?? 'Sans titre')}`,
        date: this.toDate(event?.dateDebut),
        tag: String(event?.statut ?? 'Evenement'),
        route: '/employe/evenements'
      }))
      .filter((item): item is ActivityItem => !!item.date);

    const interventionActivity = interventions
      .map((item) => ({
        title: `Intervention: ${String(item?.typeAppareil ?? 'Equipement')}`,
        date: this.toDate(item?.dateDemande),
        tag: this.interventionStatusLabel(item?.statut),
        route: '/employe/interventions'
      }))
      .filter((item): item is ActivityItem => !!item.date);

    const notificationsActivity = notifications
      .map((item) => ({
        title: String(item?.message ?? 'Notification'),
        date: this.toDate(item?.dateCreation),
        tag: item?.lu ? 'Lu' : 'Nouveau',
        route: '/employe/notifications'
      }))
      .filter((item): item is ActivityItem => !!item.date);

    return [...eventsActivity, ...interventionActivity, ...notificationsActivity]
      .sort((a, b) => b.date.getTime() - a.date.getTime())
      .slice(0, 7);
  }

  // Converts intervention states into labels shown in the UI.
  private interventionStatusLabel(status?: string | null): string {
    return interventionStatusLabel(status);
  }

  // Checks whether an intervention still needs user action.
  private isInterventionActive(status?: string | null): boolean {
    return isInterventionBlockingStatus(status);
  }

  // Checks whether a date falls inside the current month.
  private isDateInCurrentMonth(date: Date | null): boolean {
    if (!date) return false;

    const now = new Date();
    return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
  }

  // Counts documents that have not been viewed yet.
  private computeNewDocumentsCount(documents: any[]): number {
    const seenIds = this.readSeenDocIds();
    return documents.filter((item) => {
      const id = Number(item?.id);
      return Number.isFinite(id) && !seenIds.has(id);
    }).length;
  }

  // Reads the set of already viewed document IDs from storage.
  private readSeenDocIds(): Set<number> {
    const raw = localStorage.getItem(this.seenDocsKey);
    if (!raw) return new Set<number>();

    try {
      const parsed = JSON.parse(raw) as number[];
      return new Set((parsed ?? []).filter((value) => Number.isFinite(value)));
    } catch {
      return new Set<number>();
    }
  }

  // Normalizes different input formats into a Date object.
  private toDate(input: unknown): Date | null {
    if (input == null) return null;

    if (input instanceof Date) {
      return Number.isNaN(input.getTime()) ? null : input;
    }

    if (typeof input === 'number') {
      const parsed = new Date(input);
      return Number.isNaN(parsed.getTime()) ? null : parsed;
    }

    if (typeof input === 'string') {
      const value = input.trim();
      if (!value) return null;

      if (/^\d+$/.test(value)) {
        const parsedNumeric = new Date(Number(value));
        return Number.isNaN(parsedNumeric.getTime()) ? null : parsedNumeric;
      }

      const parsed = new Date(value);
      return Number.isNaN(parsed.getTime()) ? null : parsed;
    }

    return null;
  }
}