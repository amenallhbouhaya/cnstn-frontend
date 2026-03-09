import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Equipement } from '../models/equipement';

@Injectable({ providedIn: 'root' })
export class EquipementService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Equipement[]>(`${environment.apiUrl}/Equipement`);
  }

  add(body: Equipement) {
    return this.http.post<Equipement>(`${environment.apiUrl}/Equipement/add`, body);
  }

  update(id: number, body: Equipement) {
    return this.http.put<Equipement>(`${environment.apiUrl}/Equipement/${id}`, body);
  }

  delete(id: number) {
    // خاطر backend يرجّع String
    return this.http.delete(`${environment.apiUrl}/Equipement/${id}`, {
      responseType: 'text' as const
    });
  }
}