import { Component, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { finalize } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { PLATFORM_ID } from '@angular/core';

interface EvenementAgendaDto {
  id: number;
  titre: string;
  dateDebut: string;
  dateFin: string;
  typeEvenement: string;
  statut: string;
  salles: string[];
  equipements: string[];
}

@Component({
  selector: 'app-rsalle-agenda',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rsalle-agenda.html'
})
export class RsalleAgendaComponent {
  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);

  items: EvenementAgendaDto[] = [];
  loading = false;
  errorMsg = '';

  ngOnInit() {
    if (!isPlatformBrowser(this.platformId)) return;
    this.load();
  }

  load() {
    this.loading = true;
    this.errorMsg = '';

    this.http.get<EvenementAgendaDto[]>(
      `${environment.apiUrl}/api/responsable-salle/evenements/agenda`
    )
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