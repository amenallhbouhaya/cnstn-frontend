import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Salle } from '../models/salle';

@Injectable({ providedIn: 'root' })
export class SalleService {
  private readonly baseUrl = `${environment.apiUrl}/api/salles`;

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Salle[]>(this.baseUrl);
  }

  add(body: Salle) {
    return this.http.post<Salle>(this.baseUrl, body);
  }

  update(id: number, body: Salle) {
    return this.http.put<Salle>(`${this.baseUrl}/${id}`, body);
  }

  delete(id: number) {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}