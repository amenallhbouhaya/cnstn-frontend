import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Evenement } from '../models/evenement';

@Injectable({ providedIn: 'root' })
export class EvenementService {
  constructor(private http: HttpClient) {}

  // Fetches all records for this API resource.
  getAll() {
    return this.http.get<Evenement[]>(`${environment.apiUrl}/Evenement/all`);
  }

  // Adds a new item after validating the input.
  add(body: Evenement) {
    return this.http.post<Evenement>(`${environment.apiUrl}/Evenement/add`, body);
  }

  // Updates the selected item and refreshes the local state.
  update(id: number, body: Evenement) {
    return this.http.put<Evenement>(`${environment.apiUrl}/Evenement/${id}`, body);
  }

  delete(id: number) {
    return this.http.delete(`${environment.apiUrl}/Evenement/${id}`, {
      responseType: 'text' as const
    });
  }

  invite(id: number, body: { inviteAll: boolean; userIds: number[] }) {
    return this.http.post(`${environment.apiUrl}/Evenement/${id}/invite`, body, {
      responseType: 'text' as const
    });
  }
}