import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs';

import { ChefUsersApprovalApi, PendingRegistration } from '../../../core/services/chef-users-approval-api';

@Component({
  selector: 'app-chef-pending-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chef-pending-users.html',
  styleUrl: './chef-pending-users.scss'
})
export class ChefPendingUsersComponent implements OnInit {
  private api = inject(ChefUsersApprovalApi);

  items: PendingRegistration[] = [];
  loading = false;
  errorMsg = '';
  successMsg = '';

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.loading = true;
    this.errorMsg = '';
    this.successMsg = '';

    this.api.pending()
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: (data) => this.items = data ?? [],
        error: () => this.errorMsg = 'Erreur lors du chargement des comptes en attente.'
      });
  }

  accept(id: number) {
    this.errorMsg = '';
    this.successMsg = '';
    this.api.accept(id).subscribe({
      next: () => {
        this.successMsg = 'Compte accepté et créé avec le rôle Employe.';
        this.load();
      },
      error: (err) => this.errorMsg = err?.error?.message ?? 'Erreur pendant l’acceptation du compte.'
    });
  }

  reject(id: number) {
    this.errorMsg = '';
    this.successMsg = '';
    this.api.reject(id).subscribe({
      next: () => {
        this.successMsg = 'Demande refusée.';
        this.load();
      },
      error: (err) => this.errorMsg = err?.error?.message ?? 'Erreur pendant le refus du compte.'
    });
  }
}
