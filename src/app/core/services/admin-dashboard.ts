import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export interface AdminDashboardStats {
  evenementsTotal: number;
  evenementsApprouves: number;
  evenementsEnAttente: number;
  evenementsRefuses: number;
  interventionsTotal: number;
  interventionsEnAttente: number;
  sallesTotal: number;
  sallesOccupees: number;
  sallesDisponibles: number;
}

@Injectable({ providedIn: 'root' })
export class AdminDashboardService {
  constructor(private http: HttpClient) {}

  // Handles the stats flow for the current screen.
  stats() {
    return this.http.get<AdminDashboardStats>(`${environment.apiUrl}/api/admin/dashboard/stats`);
  }
}
