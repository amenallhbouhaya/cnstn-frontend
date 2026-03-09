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
}