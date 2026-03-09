import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export interface EvenementWorkflow {
  id: number;
  titre: string;
  description?: string | null;
  dateDebut: string;
  dateFin: string;
  typeEvenement: string;
  statut: string;

  salleNom?: string | null;
  salleCapacite?: number | null;
  equipements: string[];

  demandeurEmail?: string | null;
}

@Injectable({ providedIn: 'root' })
export class EvenementApprovalApi {
  constructor(private http: HttpClient) {}

  // RSalle
  pendingRsalle() {
    return this.http.get<EvenementWorkflow[]>(
      `${environment.apiUrl}/api/responsable-salle/evenements/pending`
    );
  }
  acceptRsalle(id: number) {
    return this.http.put(
      `${environment.apiUrl}/api/responsable-salle/evenements/${id}/accept`,
      {}
    );
  }
  rejectRsalle(id: number, commentaire: string) {
    return this.http.put(
      `${environment.apiUrl}/api/responsable-salle/evenements/${id}/reject`,
      { commentaire }
    );
  }

  // RSecurite
  pendingRsec() {
    return this.http.get<EvenementWorkflow[]>(
      `${environment.apiUrl}/api/responsable-securite/evenements/pending`
    );
  }
  acceptRsec(id: number) {
    return this.http.put(
      `${environment.apiUrl}/api/responsable-securite/evenements/${id}/accept`,
      {}
    );
  }
  rejectRsec(id: number, commentaire: string) {
    return this.http.put(
      `${environment.apiUrl}/api/responsable-securite/evenements/${id}/reject`,
      { commentaire }
    );
  }

  // Directeur DSN
  pendingDsn() {
    return this.http.get<EvenementWorkflow[]>(
      `${environment.apiUrl}/api/directeur-dsn/evenements/pending`
    );
  }
  acceptDsn(id: number) {
    return this.http.put(
      `${environment.apiUrl}/api/directeur-dsn/evenements/${id}/accept`,
      {}
    );
  }
  rejectDsn(id: number, commentaire: string) {
    return this.http.put(
      `${environment.apiUrl}/api/directeur-dsn/evenements/${id}/reject`,
      { commentaire }
    );
  }
}