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
  styleUrl: './admin-users.scss'
})
export class AdminUsersComponent {
  private api = inject(AdminUsersService);
  private cdr = inject(ChangeDetectorRef);

  users: UserDto[] = [];
  roles: string[] = [];
  newRole = '';
  loading = false;
  errorMsg = '';

  ngOnInit() {
    this.loadRoles();
    this.loadUsers();
  }

  loadUsers() {
    this.loading = true;
    this.errorMsg = '';

    this.api.getAll().subscribe({
      next: (data) => {
        this.users = data;
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

  loadRoles() {
    this.api.getRoles().subscribe({
      next: (data) => {
        this.roles = data ?? [];
        this.cdr.detectChanges();
      },
      error: () => {
        this.errorMsg = 'Erreur chargement roles';
      }
    });
  }

  addRole() {
    const roleName = this.newRole.trim();
    if (!roleName) {
      this.errorMsg = 'Role vide';
      return;
    }

    this.api.createRole(roleName).subscribe({
      next: () => {
        this.newRole = '';
        this.errorMsg = '';
        this.loadRoles();
      },
      error: (err) => {
        this.errorMsg = err?.error?.message ?? 'Erreur création role';
      }
    });
  }

  changeRole(u: UserDto, roleValue: string) {
    this.api.updateRole(u.id, roleValue).subscribe({
      next: (updated) => {
        u.role = updated.role;
        this.cdr.detectChanges();
      },
      error: () => (this.errorMsg = 'Erreur changement role')
    });
  }
}