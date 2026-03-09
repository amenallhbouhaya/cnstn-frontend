import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Salle } from '../models/salle';

@Injectable({ providedIn: 'root' })
export class SalleService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Salle[]>(`${environment.apiUrl}/Salle/all`);
  }

  add(body: Salle) {
    return this.http.post<Salle>(`${environment.apiUrl}/Salle/add`, body);
  }

  update(id: number, body: Salle) {
    return this.http.put<Salle>(`${environment.apiUrl}/Salle/${id}`, body);
  }

  delete(id: number) {
  return this.http.delete(`${environment.apiUrl}/Salle/${id}`, { responseType: 'text' });
}
}