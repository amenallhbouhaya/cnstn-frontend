import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export interface PendingRegistration {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  matricule: number;
  telephone: number;
  dateCreation: string;
}

@Injectable({ providedIn: 'root' })
export class ChefUsersApprovalApi {
  constructor(private http: HttpClient) {}

  pending() {
    return this.http.get<PendingRegistration[]>(`${environment.apiUrl}/api/chef-hierarchique/users/pending`);
  }

  accept(id: number) {
    return this.http.post<{ status: string; message?: string }>(`${environment.apiUrl}/api/chef-hierarchique/users/${id}/accept`, {});
  }

  reject(id: number) {
    return this.http.post<{ status: string; message?: string }>(`${environment.apiUrl}/api/chef-hierarchique/users/${id}/reject`, {});
  }
}
