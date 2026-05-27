import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { InterventionApi, InterventionDto } from '../../../core/services/intervention-api';
import { interventionStatusLabel, isInterventionBlockingStatus } from '../../../core/models/intervention-status';

@Component({
  selector: 'app-employe-interventions',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './employe-interventions.html',
  styleUrl: './employe-interventions.css'
})
export class EmployeInterventionsComponent {
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

  // Formats a status value for the template.
  statusLabel(status?: string | null) {
    return interventionStatusLabel(status);
  }

  // Handles the isBlockingStatus flow for the current screen.
  isBlockingStatus(status?: string | null) {
    return isInterventionBlockingStatus(status);
  }

  // Handles the isRepared flow for the current screen.
  isRepared(status?: string | null) {
    return status === 'REPARE';
  }
}