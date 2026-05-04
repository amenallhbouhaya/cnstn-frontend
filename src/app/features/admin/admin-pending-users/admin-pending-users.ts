import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs';

import { ChefUsersApprovalApi, PendingRegistration } from '../../../core/services/chef-users-approval-api';

@Component({
  selector: 'app-admin-pending-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-pending-users.html',
  styleUrl: './admin-pending-users.css'
})
export class AdminPendingUsersComponent implements OnInit {
  private api = inject(ChefUsersApprovalApi);

  items: PendingRegistration[] = [];
  loading = false;
  errorMsg = '';
  successMsg = '';

  ngOnInit(): void {
    this.load();
  }

  load(resetMessages: boolean = true) {
    this.loading = true;
    if (resetMessages) {
      this.errorMsg = '';
      this.successMsg = '';
    }

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
      next: (res) => {
        this.successMsg = res?.message ?? 'Compte accepte et cree avec le role Employe.';
        this.load(false);
      },
      error: (err) => this.errorMsg = err?.error?.message ?? 'Erreur pendant l’acceptation du compte.'
    });
  }

  reject(id: number) {
    this.errorMsg = '';
    this.successMsg = '';
    this.api.reject(id).subscribe({
      next: (res) => {
        this.successMsg = res?.message ?? 'Demande refusee.';
        this.load(false);
      },
      error: (err) => this.errorMsg = err?.error?.message ?? 'Erreur pendant le refus du compte.'
    });
  }
}
