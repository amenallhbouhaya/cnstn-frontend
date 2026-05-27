import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminUsersService } from '../../../core/services/admin-users';
import { UserDto } from '../../../core/models/user';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-users.html',
  styleUrl: './admin-users.css'
})
export class AdminUsersComponent {
  private api = inject(AdminUsersService);
  private cdr = inject(ChangeDetectorRef);

  users: UserDto[] = [];
  roles: string[] = [];
  newRole = '';
  loading = false;
  errorMsg = '';
  successMsg = '';

  // Initializes the component and loads its first data.
  ngOnInit() {
    this.loadRoles();
    this.loadUsers();
  }

  // Loads the current user list and normalizes role values.
  loadUsers() {
    this.loading = true;
    this.errorMsg = '';
    this.successMsg = '';

    this.api.getAll().subscribe({
      next: (data) => {
        this.users = (data ?? []).map((user) => ({
          ...user,
          role: user.role ? user.role.trim() : user.role
        }));
        this.syncRolesWithUsers();
        this.loading = false;
        this.cdr.detectChanges(); // ✅ مهمّة
        console.log('users loaded', data.length);
      },
      error: (err) => {
        this.loading = false;
        this.errorMsg = `Erreur (${err?.status ?? 'no status'})`;
        this.cdr.detectChanges(); // ✅ مهمّة
        console.log('admin/users error', err);
      }
    });
  }

  // Loads the available role names.
  loadRoles() {
    this.api.getRoles().subscribe({
      next: (data) => {
        this.roles = (data ?? [])
          .map((role) => (role ? role.trim() : role))
          .filter((role): role is string => !!role);
        this.syncRolesWithUsers();
        this.cdr.detectChanges();
      },
      error: () => {
        this.errorMsg = 'Erreur chargement roles';
      }
    });
  }

  // Creates a new role after validating the input.
  addRole() {
    const roleName = this.newRole.trim();
    if (!roleName) {
      this.errorMsg = 'Role vide';
      return;
    }

    this.successMsg = '';
    this.api.createRole(roleName).subscribe({
      next: () => {
        this.newRole = '';
        this.errorMsg = '';
        this.successMsg = 'Role ajoute avec succes.';
        this.loadRoles();
      },
      error: (err) => {
        this.errorMsg = err?.error?.message ?? 'Erreur création role';
      }
    });
  }

  // Updates the selected user role.
  changeRole(u: UserDto, roleValue: string) {
    const normalizedRole = roleValue?.trim() ?? '';
    if (!normalizedRole || normalizedRole === u.role) {
      return;
    }

    this.successMsg = '';
    this.api.updateRole(u.id, normalizedRole).subscribe({
      next: (updated) => {
        u.role = updated.role;
        this.errorMsg = '';
        this.successMsg = 'Role utilisateur mis a jour.';
        this.cdr.detectChanges();
      },
      error: () => (this.errorMsg = 'Erreur changement role')
    });
  }

  // Deletes the selected user account.
  deleteUser(u: UserDto) {
    const confirmed = window.confirm(`Supprimer l'utilisateur ${u.nom} ${u.prenom} ?`);
    if (!confirmed) return;

    this.errorMsg = '';
    this.successMsg = '';

    this.api.deleteUser(u.id).subscribe({
      next: (res) => {
        this.users = this.users.filter((item) => item.id !== u.id);
        this.successMsg = res?.message ?? 'Utilisateur supprime avec succes.';
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.errorMsg = err?.error?.message ?? 'Erreur suppression utilisateur';
      }
    });
  }

  // Merges the available roles with the roles already used by users.
  private syncRolesWithUsers() {
    const roleSet = new Set(
      (this.roles ?? []).map((role) => (role ? role.trim() : role)).filter((role): role is string => !!role)
    );

    for (const user of this.users ?? []) {
      const role = user.role ? user.role.trim() : '';
      if (role) {
        roleSet.add(role);
      }
    }

    this.roles = Array.from(roleSet).sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));
  }
}