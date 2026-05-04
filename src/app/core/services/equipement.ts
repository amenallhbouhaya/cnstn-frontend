import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Equipement } from '../models/equipement';

@Injectable({ providedIn: 'root' })
export class EquipementService {
  private readonly baseUrl = `${environment.apiUrl}/api/equipements`;

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Equipement[]>(this.baseUrl);
  }

  add(body: Equipement) {
    return this.http.post<Equipement>(this.baseUrl, body);
  }

  update(id: number, body: Equipement) {
    return this.http.put<Equipement>(`${this.baseUrl}/${id}`, body);
  }

  delete(id: number) {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}