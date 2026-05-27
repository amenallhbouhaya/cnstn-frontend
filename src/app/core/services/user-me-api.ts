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
}

@Injectable({ providedIn: 'root' })
export class UserMeApi {
  constructor(private http: HttpClient) {}

  // Fetches the current logged-in user profile.
  me() {
    return this.http.get<MeResponse>(`${environment.apiUrl}/api/users/me`);
  }

  // Updates the current user profile information.
  updateMe(body: { nom: string; prenom: string; poste: string; adresse: string; telephone: number }) {
    return this.http.put<MeResponse>(`${environment.apiUrl}/api/users/me`, body);
  }

  // Changes the current user password.
  changePassword(body: { oldPassword: string; newPassword: string }) {
    return this.http.post(`${environment.apiUrl}/api/users/me/password`, body);
  }

  // Uploads the current user profile photo.
  uploadPhoto(file: File) {
    const fd = new FormData();
    fd.append('file', file);
    return this.http.post(`${environment.apiUrl}/api/users/me/photo`, fd);
  }

  // Downloads the current user profile photo.
  getPhoto() {
    return this.http.get(`${environment.apiUrl}/api/users/me/photo`, { responseType: 'blob' });
  }
}