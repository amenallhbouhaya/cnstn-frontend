import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs';

import { InterventionApi, InterventionDto } from '../../../core/services/intervention-api';
import { canAdminDecideIntervention, interventionStatusLabel } from '../../../core/models/intervention-status';

@Component({
  selector: 'app-admin-interventions',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-interventions.html',
  styleUrl: './admin-interventions.css'
})
export class AdminInterventionsComponent {
  private api = inject(InterventionApi);

  items: InterventionDto[] = [];
  loading = false;
  errorMsg = '';

  // Initializes the component and loads its first data.
  ngOnInit() {
    this.load();
  }

  // Loads the current dataset from the backend.
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

  // Marks the intervention as repaired.
  markRepaired(item: InterventionDto) {
    this.api.repairAdmin(item.id).subscribe({
      next: () => this.load(),
      error: (err) => {
        console.log(err);
        this.errorMsg = 'Erreur validation';
      }
    });
  }

  // Marks the intervention as broken.
  markBroken(item: InterventionDto) {
    this.api.brokenAdmin(item.id).subscribe({
      next: () => this.load(),
      error: (err) => {
        console.log(err);
        this.errorMsg = 'Erreur validation';
      }
    });
  }

  // Formats a status value for the template.
  statusLabel(status?: string | null) {
    return interventionStatusLabel(status);
  }

  // Determines whether the current user can act on this item.
  canDecide(status?: string | null) {
    return canAdminDecideIntervention(status);
  }
}
