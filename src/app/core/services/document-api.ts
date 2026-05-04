import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { DocumentItem } from '../models/document';

@Injectable({ providedIn: 'root' })
export class DocumentApi {
  private readonly baseUrl = `${environment.apiUrl}/api/documents`;

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<DocumentItem[]>(this.baseUrl);
  }

  myDocs() {
    return this.http.get<DocumentItem[]>(`${this.baseUrl}/me`);
  }

  // ✅ download (blob)
  download(id: number) {
    return this.http.get(`${this.baseUrl}/${id}/download`, {
      responseType: 'blob'
    });
  }

  sendToDemandeur(eventId: number, file: File, titre: string, niveauAcces?: string) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('titre', titre);
    if (niveauAcces) formData.append('niveauAcces', niveauAcces);

    return this.http.post(
      `${environment.apiUrl}/api/directeur-dsn/documents/send-to-demandeur/${eventId}`,
      formData
    );
  }

  sendToEmployes(file: File, titre: string, niveauAcces?: string) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('titre', titre);
    if (niveauAcces) formData.append('niveauAcces', niveauAcces);

    return this.http.post(
      `${environment.apiUrl}/api/directeur-dsn/documents/send-to-employes`,
      formData
    );
  }
}