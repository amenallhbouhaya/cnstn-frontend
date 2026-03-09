import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export interface CreateInterventionRequest {
  description: string;
  equipementIds: number[];
}

export interface InterventionDto {
  id: number;
  description: string | null;
  statut: string;
  dateDemande: string;
  demandeurId: number;
  demandeurEmail: string;
  equipementIds: number[];
}

@Injectable({ providedIn: 'root' })
export class InterventionApi {
  constructor(private http: HttpClient) {}

  create(body: CreateInterventionRequest) {
    return this.http.post(`${environment.apiUrl}/api/interventions`, body);
  }

  my() {
    return this.http.get<InterventionDto[]>(`${environment.apiUrl}/api/interventions/me`);
  }
}