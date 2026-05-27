import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { UserDto } from '../models/user';

@Injectable({ providedIn: 'root' })
export class AdminUsersService {
  constructor(private http: HttpClient) {}

  // Fetches all records for this API resource.
  getAll() {
    return this.http.get<UserDto[]>(`${environment.apiUrl}/api/admin/users`);
  }

  // Fetches the role list from the backend.
  getRoles() {
    return this.http.get<string[]>(`${environment.apiUrl}/api/admin/roles`);
  }

  // Creates a new role on the backend.
  createRole(name: string) {
    return this.http.post<{ name: string }>(`${environment.apiUrl}/api/admin/roles`, { name });
  }

  // Updates the role assigned to a user.
  updateRole(id: number, role: string) {
    return this.http.put<UserDto>(`${environment.apiUrl}/api/admin/users/${id}/role`, { role });
  }

  // Deletes the selected user account.
  deleteUser(id: number) {
    return this.http.delete<{ status: string; message?: string }>(`${environment.apiUrl}/api/admin/users/${id}`);
  }
}