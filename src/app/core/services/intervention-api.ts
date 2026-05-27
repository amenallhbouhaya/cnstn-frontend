import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export interface CreateInterventionRequest {
  nom: string;
  typeAppareil: string;
  numeroSerie: string;
  descriptionPanne: string;
  equipementIds: number[];
}

export interface InterventionDto {
  id: number;
  nomDemandeur: string | null;
  descriptionPanne: string | null;
  typeAppareil: string | null;
  numeroSerie: string | null;
  statut: string;
  dateDemande: string;
  demandeurId: number;
  demandeurNom: string | null;
  demandeurPrenom: string | null;
  demandeurEmail: string;
  equipementIds: number[];
  chefCommentaire: string | null;
  repairMode: string | null;
  dateReparation: string | null;
}

@Injectable({ providedIn: 'root' })
export class InterventionApi {
  constructor(private http: HttpClient) {}

  // Creates a new backend resource.
  create(body: CreateInterventionRequest) {
    return this.http.post(`${environment.apiUrl}/api/interventions`, body);
  }

  // Fetches the current user items.
  my() {
    return this.http.get<InterventionDto[]>(`${environment.apiUrl}/api/interventions/me`);
  }

  // Handles the pendingChef flow for the current screen.
  pendingChef() {
    return this.http.get<InterventionDto[]>(`${environment.apiUrl}/api/interventions/chef/pending`);
  }

  // Handles the acceptChef flow for the current screen.
  acceptChef(id: number, commentaire?: string) {
    return this.http.post<InterventionDto>(`${environment.apiUrl}/api/interventions/chef/${id}/accept`, {
      commentaire: commentaire ?? ''
    });
  }

  // Handles the rejectChef flow for the current screen.
  rejectChef(id: number, commentaire: string) {
    return this.http.post<InterventionDto>(`${environment.apiUrl}/api/interventions/chef/${id}/reject`, {
      commentaire
    });
  }

  // Handles the pendingAdmin flow for the current screen.
  pendingAdmin() {
    return this.http.get<InterventionDto[]>(`${environment.apiUrl}/api/interventions/admin/pending`);
  }

  // Handles the startAdmin flow for the current screen.
  startAdmin(id: number, repairMode: string) {
    return this.http.post<InterventionDto>(`${environment.apiUrl}/api/interventions/admin/${id}/start`, {
      repairMode
    });
  }

  // Handles the completeAdmin flow for the current screen.
  completeAdmin(id: number, observation: string, dateReparation: string) {
    return this.http.post<InterventionDto>(`${environment.apiUrl}/api/interventions/admin/${id}/complete`, {
      observation,
      dateReparation
    });
  }

  // Handles the repairAdmin flow for the current screen.
  repairAdmin(id: number) {
    return this.http.post<InterventionDto>(`${environment.apiUrl}/api/interventions/admin/${id}/repair`, {});
  }

  // Handles the brokenAdmin flow for the current screen.
  brokenAdmin(id: number) {
    return this.http.post<InterventionDto>(`${environment.apiUrl}/api/interventions/admin/${id}/broken`, {});
  }

  
}