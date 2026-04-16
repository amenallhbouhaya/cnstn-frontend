import { Component, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { finalize } from 'rxjs';
import { PLATFORM_ID } from '@angular/core';
import { AgendaApi } from '../../../core/services/agenda-api';
import { EvenementAgendaItem } from '../../../core/models/evenement-agenda';

@Component({
  selector: 'app-rsalle-agenda',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rsalle-agenda.html'
})
export class RsalleAgendaComponent {
  private agendaApi = inject(AgendaApi);
  private platformId = inject(PLATFORM_ID);

  items: EvenementAgendaItem[] = [];
  loading = false;
  errorMsg = '';

  ngOnInit() {
    if (!isPlatformBrowser(this.platformId)) return;
    this.load();
  }

  load() {
    this.loading = true;
    this.errorMsg = '';

    this.agendaApi.responsableSalleAgenda()
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: data => this.items = data ?? [],
        error: err => {
          console.log(err);
          this.errorMsg = 'Erreur chargement agenda';
        }
      });
  }
}