import { Component, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { PLATFORM_ID } from '@angular/core';

import { EvenementApprovalApi, EvenementWorkflow } from '../../../core/services/evenement-approval-api';

@Component({
  selector: 'app-rsec-evenements-pending',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './rsec-evenements-pending.html',
  styleUrl: './rsec-evenements-pending.css'
})
export class RsecEvenementsPendingComponent {
  private api = inject(EvenementApprovalApi);
  private platformId = inject(PLATFORM_ID);

  items: EvenementWorkflow[] = [];
  loading = false;
  errorMsg = '';

  rejectOpen: Record<number, boolean> = {};
  rejectComment: Record<number, string> = {};

  // Initializes the component and loads its first data.
  ngOnInit() {
    if (!isPlatformBrowser(this.platformId)) return;
    this.load();
  }

  // Loads the current dataset from the backend.
  load() {
    this.loading = true;
    this.errorMsg = '';
    this.api.pendingRsec()
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: data => {
          this.items = (data ?? []).filter((eventItem) => {
            if (!eventItem) return false;
            if (!eventItem.id) return false;

            const hasTitre = !!String(eventItem.titre ?? '').trim();
            const hasStart = !!eventItem.dateDebut;
            const hasEnd = !!eventItem.dateFin;
            return hasTitre && hasStart && hasEnd;
          });
        },
        error: err => {
          console.log(err);
          this.errorMsg = 'Erreur chargement (RSécurité)';
        }
      });
  }

  // Accepts the current item and refreshes the list.
  accept(id: number) {
    this.api.acceptRsec(id).subscribe({
      next: () => this.load(),
      error: err => { console.log(err); this.errorMsg = 'Erreur accept'; }
    });
  }

  // Opens the rejection dialog.
  openReject(id: number) {
    this.rejectOpen[id] = true;
    this.rejectComment[id] = this.rejectComment[id] ?? '';
  }

  // Closes the rejection dialog without sending anything.
  cancelReject(id: number) {
    this.rejectOpen[id] = false;
    this.rejectComment[id] = '';
  }

  // Confirms the rejection action and sends the comment to the backend.
  confirmReject(id: number) {
    const c = (this.rejectComment[id] ?? '').trim();
    if (!c) {
      this.errorMsg = 'Veuillez saisir un commentaire de refus';
      return;
    }
    this.api.rejectRsec(id, c).subscribe({
      next: () => {
        this.rejectOpen[id] = false;
        this.rejectComment[id] = '';
        this.load();
      },
      error: err => { console.log(err); this.errorMsg = 'Erreur reject'; }
    });
  }
}