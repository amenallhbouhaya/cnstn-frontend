import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Equipement } from '../models/equipement';

@Injectable({ providedIn: 'root' })
export class EquipementService {
  private readonly baseUrl = `${environment.apiUrl}/api/equipements`;

  constructor(private http: HttpClient) {}

  // Fetches all records for this API resource.
  getAll() {
    return this.http.get<Equipement[]>(this.baseUrl);
  }

  // Adds a new item after validating the input.
  add(body: Equipement) {
    return this.http.post<Equipement>(this.baseUrl, body);
  }

  // Updates the selected item and refreshes the local state.
  update(id: number, body: Equipement) {
    return this.http.put<Equipement>(`${this.baseUrl}/${id}`, body);
  }

  delete(id: number) {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}