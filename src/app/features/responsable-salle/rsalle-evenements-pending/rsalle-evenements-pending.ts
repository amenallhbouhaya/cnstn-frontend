import { Component, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { EvenementApprovalApi, EvenementWorkflow } from '../../../core/services/evenement-approval-api';
import { FormsModule } from '@angular/forms';
import { PLATFORM_ID } from '@angular/core';
@Component({
  selector: 'app-rsalle-evenements-pending',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './rsalle-evenements-pending.html',
  styleUrl: './rsalle-evenements-pending.scss'
})
export class RsalleEvenementsPendingComponent {
  private api = inject(EvenementApprovalApi);
  private platformId = inject(PLATFORM_ID);

  items: EvenementWorkflow[] = [];
  loading = false;
  errorMsg = '';

  // reject UI state per event
  rejectOpen: Record<number, boolean> = {};
  rejectComment: Record<number, string> = {};

  ngOnInit() {
    if (!isPlatformBrowser(this.platformId)) return;
    this.load();
  }

  load() {
    this.loading = true;
    this.errorMsg = '';
    this.api.pendingRsalle()
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: data => this.items = data ?? [],
        error: err => {
          console.log(err);
          this.errorMsg = 'Erreur chargement (RSalle)';
        }
      });
  }

  accept(id: number) {
    this.api.acceptRsalle(id).subscribe({
      next: () => this.load(),
      error: err => { console.log(err); this.errorMsg = 'Erreur accept'; }
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
    const c = (this.rejectComment[id] ?? '').trim();
    if (!c) {
      this.errorMsg = 'Veuillez saisir un commentaire de refus';
      return;
    }
    this.api.rejectRsalle(id, c).subscribe({
      next: () => {
        this.rejectOpen[id] = false;
        this.rejectComment[id] = '';
        this.load();
      },
      error: err => { console.log(err); this.errorMsg = 'Erreur reject'; }
    });
  }
}