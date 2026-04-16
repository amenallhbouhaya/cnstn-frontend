import { Component, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PLATFORM_ID } from '@angular/core';

import { InvitationsApi, InvitationView } from '../../core/services/invitations-api';

@Component({
  selector: 'app-invitation-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './invitation-view.html',
  styleUrl: './invitation-view.css'
})
export class InvitationViewComponent {
  private api = inject(InvitationsApi);
  private route = inject(ActivatedRoute);
  private platformId = inject(PLATFORM_ID);

  data: InvitationView | null = null;
  loading = false;
  errorMsg = '';

  ngOnInit() {
    if (!isPlatformBrowser(this.platformId)) return;

    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!Number.isFinite(id)) {
      this.errorMsg = 'Invitation introuvable';
      return;
    }

    this.loading = true;
    this.api.getInvitation(id).subscribe({
      next: (data) => {
        this.data = data;
        this.loading = false;
      },
      error: (err) => {
        console.log(err);
        this.loading = false;
        this.errorMsg = 'Impossible de charger la convocation';
      }
    });
  }

  print() {
    if (!isPlatformBrowser(this.platformId)) return;
    window.print();
  }

  downloadPdf() {
    if (!isPlatformBrowser(this.platformId)) return;
    const originalTitle = document.title;
    const title = this.data?.titre ? `Convocation - ${this.data.titre}` : 'Convocation';
    document.title = title;
    window.print();
    setTimeout(() => document.title = originalTitle, 0);
  }
}
