import { Component, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PLATFORM_ID } from '@angular/core';

import { InvitationsApi, InvitationView } from '../../../core/services/invitations-api';

@Component({
  selector: 'app-rsec-invitation-check',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './rsec-invitation-check.html',
  styleUrl: './rsec-invitation-check.css'
})
export class RsecInvitationCheckComponent {
  private api = inject(InvitationsApi);
  private platformId = inject(PLATFORM_ID);

  referenceCode = '';

  loading = false;
  errorMsg = '';
  status = '';
  message = '';
  invitation: InvitationView | null = null;

  ngOnInit() {
    if (!isPlatformBrowser(this.platformId)) return;
  }

  check() {
    this.resetState();
    if (!this.referenceCode.trim()) {
      this.errorMsg = 'Veuillez saisir la reference.';
      return;
    }

    this.loading = true;
    this.api.checkInvitation({
      referenceCode: this.referenceCode.trim()
    }).subscribe({
      next: (res) => {
        this.loading = false;
        this.status = res.status;
        this.message = res.message;
        this.invitation = res.invitation;
      },
      error: (err) => {
        console.log(err);
        this.loading = false;
        this.errorMsg = 'Erreur verification.';
      }
    });
  }

  consume() {
    this.errorMsg = '';
    this.loading = true;
    this.api.consumeInvitation({
      referenceCode: this.referenceCode.trim()
    }).subscribe({
      next: (res) => {
        this.loading = false;
        this.status = res.status;
        this.message = res.message;
        this.invitation = res.invitation;
      },
      error: (err) => {
        console.log(err);
        this.loading = false;
        this.errorMsg = 'Erreur validation.';
      }
    });
  }

  private resetState() {
    this.errorMsg = '';
    this.status = '';
    this.message = '';
    this.invitation = null;
  }
}
