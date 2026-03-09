import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Evenement } from '../models/evenement';

@Injectable({ providedIn: 'root' })
export class EvenementService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Evenement[]>(`${environment.apiUrl}/Evenement/all`);
  }

  add(body: Evenement) {
    return this.http.post<Evenement>(`${environment.apiUrl}/Evenement/add`, body);
  }

  update(id: number, body: Evenement) {
    return this.http.put<Evenement>(`${environment.apiUrl}/Evenement/${id}`, body);
  }

  delete(id: number) {
    return this.http.delete(`${environment.apiUrl}/Evenement/${id}`, {
      responseType: 'text' as const
    });
  }
}