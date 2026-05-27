import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { DocumentItem } from '../models/document';

@Injectable({ providedIn: 'root' })
export class DocumentApi {
  private readonly baseUrl = `${environment.apiUrl}/api/documents`;

  constructor(private http: HttpClient) {}

  // Fetches all records for this API resource.
  getAll() {
    return this.http.get<DocumentItem[]>(this.baseUrl);
  }

  // Handles the myDocs flow for the current screen.
  myDocs() {
    return this.http.get<DocumentItem[]>(`${this.baseUrl}/me`);
  }

  // ✅ download (blob)
  download(id: number) {
    return this.http.get(`${this.baseUrl}/${id}/download`, {
      responseType: 'blob'
    });
  }

  // Handles the sendToDemandeur flow for the current screen.
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

  // Handles the sendToEmployes flow for the current screen.
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