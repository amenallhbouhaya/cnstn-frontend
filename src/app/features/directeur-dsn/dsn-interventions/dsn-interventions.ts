import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs';

import { InterventionApi, InterventionDto } from '../../../core/services/intervention-api';
import { canAdminDecideIntervention, interventionStatusLabel } from '../../../core/models/intervention-status';

@Component({
  selector: 'app-dsn-interventions',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dsn-interventions.html',
  styleUrl: './dsn-interventions.css'
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

    this.api.pendingAdmin()
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
    this.api.repairAdmin(item.id).subscribe({
      next: () => this.load(),
      error: (err) => {
        console.log(err);
        this.errorMsg = 'Erreur validation';
      }
    });
  }

  markBroken(item: InterventionDto) {
    this.api.brokenAdmin(item.id).subscribe({
      next: () => this.load(),
      error: (err) => {
        console.log(err);
        this.errorMsg = 'Erreur validation';
      }
    });
  }

  statusLabel(status?: string | null) {
    return interventionStatusLabel(status);
  }

  canDecide(status?: string | null) {
    return canAdminDecideIntervention(status);
  }
}
