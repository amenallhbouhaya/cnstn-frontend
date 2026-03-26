import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs';

import { InterventionApi, InterventionDto } from '../../../core/services/intervention-api';

@Component({
  selector: 'app-dsn-interventions',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dsn-interventions.html',
  styleUrl: './dsn-interventions.scss'
})
export class DsnInterventionsComponent {
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

    this.api.pendingDsn()
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: (data) => this.items = data ?? [],
        error: (err) => {
          console.log(err);
          this.errorMsg = 'Erreur chargement interventions';
        }
      });
  }

  markRepaired(item: InterventionDto) {
    this.api.repairDsn(item.id).subscribe({
      next: () => this.load(),
      error: (err) => {
        console.log(err);
        this.errorMsg = 'Erreur validation';
      }
    });
  }

  markBroken(item: InterventionDto) {
    this.api.brokenDsn(item.id).subscribe({
      next: () => this.load(),
      error: (err) => {
        console.log(err);
        this.errorMsg = 'Erreur validation';
      }
    });
  }

  canDecide(status?: string | null) {
    return status === 'EN_ATTENTE_DSN' || status === 'EN_COURS';
  }
}
