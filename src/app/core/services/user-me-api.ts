import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export interface MeResponse {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  poste: string;
  adresse: string;
  telephone: number;
  matricule: number;
  role: string;
  serviceId?: number | null;
  serviceNom?: string | null;
}

@Injectable({ providedIn: 'root' })
export class UserMeApi {
  constructor(private http: HttpClient) {}

  me() {
    return this.http.get<MeResponse>(`${environment.apiUrl}/api/users/me`);
  }

  updateMe(body: { nom: string; prenom: string; poste: string; adresse: string; telephone: number }) {
    return this.http.put<MeResponse>(`${environment.apiUrl}/api/users/me`, body);
  }

  changePassword(body: { oldPassword: string; newPassword: string }) {
    return this.http.post(`${environment.apiUrl}/api/users/me/password`, body);
  }
  uploadPhoto(file: File) {
  const fd = new FormData();
  fd.append('file', file);
  return this.http.post(`${environment.apiUrl}/api/users/me/photo`, fd);
}

getPhoto() {
  return this.http.get(`${environment.apiUrl}/api/users/me/photo`, { responseType: 'blob' });
}
}