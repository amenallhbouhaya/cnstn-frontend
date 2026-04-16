import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { UserDto } from '../models/user';

@Injectable({ providedIn: 'root' })
export class AdminUsersService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<UserDto[]>(`${environment.apiUrl}/api/admin/users`);
  }

  getRoles() {
    return this.http.get<string[]>(`${environment.apiUrl}/api/admin/roles`);
  }

  createRole(name: string) {
    return this.http.post<{ name: string }>(`${environment.apiUrl}/api/admin/roles`, { name });
  }

  updateRole(id: number, role: string) {
    return this.http.put<UserDto>(`${environment.apiUrl}/api/admin/users/${id}/role`, { role });
  }

  deleteUser(id: number) {
    return this.http.delete<{ status: string; message?: string }>(`${environment.apiUrl}/api/admin/users/${id}`);
  }
}