import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs';

import { InterventionApi, InterventionDto } from '../../../core/services/intervention-api';

@Component({
  selector: 'app-chef-interventions',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chef-interventions.html',
  styleUrl: './chef-interventions.scss'
})
export class ChefInterventionsComponent {
  private api = inject(InterventionApi);

  items: InterventionDto[] = [];
  loading = false;
  errorMsg = '';

  rejectOpen: Record<number, boolean> = {};
  rejectComment: Record<number, string> = {};

  ngOnInit() {
    this.load();
  }

  load() {
    this.loading = true;
    this.errorMsg = '';

    this.api.pendingChef()
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: (data) => this.items = data ?? [],
        error: (err) => {
          console.log(err);
          this.errorMsg = 'Erreur chargement interventions';
        }
      });
  }

  accept(id: number) {
    this.api.acceptChef(id, '').subscribe({
      next: () => this.load(),
      error: (err) => {
        console.log(err);
        this.errorMsg = 'Erreur acceptation';
      }
    });
  }

  openReject(id: number) {
    this.rejectOpen[id] = true;
    this.rejectComment[id] = this.rejectComment[id] ?? '';
  }

  cancelReject(id: number) {
    this.rejectOpen[id] = false;
    this.rejectComment[id] = '';
  }

  confirmReject(id: number) {
    const comment = (this.rejectComment[id] ?? '').trim();
    if (!comment) {
      this.errorMsg = 'Commentaire obligatoire';
      return;
    }

    this.api.rejectChef(id, comment).subscribe({
      next: () => {
        this.rejectOpen[id] = false;
        this.rejectComment[id] = '';
        this.load();
      },
      error: (err) => {
        console.log(err);
        this.errorMsg = 'Erreur rejet';
      }
    });
  }
}
