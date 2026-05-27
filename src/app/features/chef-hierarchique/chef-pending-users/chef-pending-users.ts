import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs';

import { ChefUsersApprovalApi, PendingRegistration } from '../../../core/services/chef-users-approval-api';

@Component({
  selector: 'app-chef-pending-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chef-pending-users.html',
  styleUrl: './chef-pending-users.css'
})
export class ChefPendingUsersComponent implements OnInit {
  private api = inject(ChefUsersApprovalApi);

  items: PendingRegistration[] = [];
  loading = false;
  errorMsg = '';
  successMsg = '';

  // Initializes the component and loads its first data.
  ngOnInit(): void {
    this.load();
  }

  // Loads the current dataset from the backend.
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

  // Accepts the current item and refreshes the list.
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

  // Rejects the current item and refreshes the list.
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
