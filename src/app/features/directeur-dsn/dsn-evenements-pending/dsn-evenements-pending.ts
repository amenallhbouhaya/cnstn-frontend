import { Component, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { DocumentApi } from '../../../core/services/document-api';
import { EvenementApprovalApi, EvenementWorkflow } from '../../../core/services/evenement-approval-api';
import { PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-dsn-evenements-pending',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './dsn-evenements-pending.html',
  styleUrl: './dsn-evenements-pending.scss'
})
export class DsnEvenementsPendingComponent {
  private api = inject(EvenementApprovalApi);
  private docApi = inject(DocumentApi);
  private platformId = inject(PLATFORM_ID);
  items: EvenementWorkflow[] = [];
  loading = false;
  errorMsg = '';

  rejectOpen: Record<number, boolean> = {};
  rejectComment: Record<number, string> = {};

  ngOnInit() {
    if (!isPlatformBrowser(this.platformId)) return;
    this.load();
  }

  load() {
    this.loading = true;
    this.errorMsg = '';
    this.api.pendingDsn()
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: (data: EvenementWorkflow[]) => {
          this.items = (data ?? []).filter((eventItem) => {
            if (!eventItem) return false;
            if (!eventItem.id) return false;

            const hasTitre = !!String(eventItem.titre ?? '').trim();
            const hasStart = !!eventItem.dateDebut;
            const hasEnd = !!eventItem.dateFin;
            return hasTitre && hasStart && hasEnd;
          });
        },
        error: (err: unknown) => {
          console.log(err);
          this.errorMsg = 'Erreur chargement (Directeur DSN)';
        }
      });
  }

  accept(id: number) {
    this.api.acceptDsn(id).subscribe({
      next: () => this.load(),
      error: (err: unknown) => { console.log(err); this.errorMsg = 'Erreur accept'; }
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
    this.api.rejectDsn(id, c).subscribe({
      next: () => {
        this.rejectOpen[id] = false;
        this.rejectComment[id] = '';
        this.load();
      },
      error: (err: unknown) => { console.log(err); this.errorMsg = 'Erreur reject'; }
    });
  }
  docOpen: Record<number, boolean> = {};
  docTitle: Record<number, string> = {};
  docFile: Record<number, File | null> = {};
  docMsg = '';

  openDoc(id: number) {
    this.docOpen[id] = true;
    this.docTitle[id] = this.docTitle[id] ?? '';
    this.docFile[id] = this.docFile[id] ?? null;
    this.docMsg = '';
  }

  cancelDoc(id: number) {
    this.docOpen[id] = false;
    this.docTitle[id] = '';
    this.docFile[id] = null;
  }

  onFileSelected(id: number, ev: Event) {
    const input = ev.target as HTMLInputElement;
    const file = input.files?.[0] ?? null;
    this.docFile[id] = file;
  }

  sendDoc(eventId: number) {
    const titre = (this.docTitle[eventId] ?? '').trim();
    const file = this.docFile[eventId];

    if (!titre) {
      this.errorMsg = 'Titre document obligatoire';
      return;
    }
    if (!file) {
      this.errorMsg = 'Veuillez choisir un fichier';
      return;
    }

    this.errorMsg = '';
    this.docMsg = '';

    this.docApi.sendToDemandeur(eventId, file, titre).subscribe({
      next: () => {
        this.docMsg = 'Document envoyé au demandeur';
        this.cancelDoc(eventId);
      },
      error: (err: unknown) => {
        console.log(err);
        this.errorMsg = 'Erreur envoi document';
      }
    });
  }
}