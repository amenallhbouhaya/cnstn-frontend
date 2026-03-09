import { Component, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { finalize, timeout } from 'rxjs';
import { EmployeEvenementApi } from '../../../core/services/employe-evenement-api';
import { PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-employe-mes-evenements',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './employe-mes-evenements.html',
  styleUrl: './employe-mes-evenements.scss'
})
export class EmployeMesEvenementsComponent {
  private api = inject(EmployeEvenementApi);
  private platformId = inject(PLATFORM_ID);

  items: any[] = [];
  loading: boolean = false;
  errorMsg: string = '';

  ngOnInit() {
    if (!isPlatformBrowser(this.platformId)) return;
    console.log('MesEvenements INIT');
    this.load();
  }

  load() {
    console.log('MesEvenements LOAD -> calling /Evenement/my');
    this.loading = true;
    this.errorMsg = '';

    this.api.myEvents()
      .pipe(
        timeout(10000),
        finalize(() => {
          this.loading = false;
          console.log('MesEvenements FINALIZE loading=false');
        })
      )
      .subscribe({
        next: (data) => {
          this.items = data ?? [];
          console.log('MesEvenements DATA:', this.items);
        },
        error: (err) => {
          console.log('MesEvenements ERROR:', err);
          this.errorMsg = `Erreur (status: ${err?.status ?? 'no status'})`;
        }
      });
  }

  workflowLabel(statut: string | null | undefined): string {
    switch (String(statut ?? '').trim()) {
      case 'EN_ATTENTE_RSALLE':
        return 'Chez Responsable Salle';
      case 'EN_ATTENTE_RSEC':
        return 'Chez Responsable Sécurité';
      case 'EN_ATTENTE_DSN':
        return 'Chez Directeur DSN';
      case 'APPROUVE':
        return 'Approuvé';
      case 'REFUSE_RSALLE':
        return 'Refusé par Responsable Salle';
      case 'REFUSE_RSEC':
        return 'Refusé par Responsable Sécurité';
      case 'REFUSE_DSN':
        return 'Refusé par Directeur DSN';
      default:
        return String(statut ?? '-');
    }
  }

  statusBadgeClass(statut: string | null | undefined): string {
    const value = String(statut ?? '').trim();
    if (value === 'APPROUVE') return 'badge--green';
    if (value.startsWith('REFUSE')) return 'badge--red';
    if (value.startsWith('EN_ATTENTE')) return 'badge--orange';
    return 'badge--outline';
  }
}