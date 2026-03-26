import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { InterventionApi, InterventionDto } from '../../../core/services/intervention-api';

@Component({
  selector: 'app-employe-interventions',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './employe-interventions.html',
  styleUrl: './employe-interventions.scss'
})
export class EmployeInterventionsComponent {
  private api = inject(InterventionApi);

  items: InterventionDto[] = [];
  loading = false;
  errorMsg = '';

  ngOnInit() {
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
          this.errorMsg = 'Erreur chargement demandes';
        }
      });
  }

  statusLabel(status?: string | null) {
    switch (status) {
      case 'EN_ATTENTE_CHEF':
        return 'En attente chef';
      case 'EN_ATTENTE_DSN':
        return 'En attente DSN';
      case 'EN_COURS':
        return 'En cours';
      case 'REPARE':
        return 'Repare';
      case 'CASSE':
        return 'Casse';
      case 'REFUSEE_CHEF':
        return 'Refusee chef';
      default:
        return status || '-';
    }
  }

  isBlockingStatus(status?: string | null) {
    return status === 'EN_ATTENTE_CHEF' || status === 'EN_ATTENTE_DSN' || status === 'EN_COURS' || status === 'CASSE';
  }

  isRepared(status?: string | null) {
    return status === 'REPARE';
  }
}