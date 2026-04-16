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
  serviceNom: string | null;
  equipementIds: number[];
  chefCommentaire: string | null;
  repairMode: string | null;
  dsnObservation: string | null;
  dateReparation: string | null;
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

  pendingChef() {
    return this.http.get<InterventionDto[]>(`${environment.apiUrl}/api/interventions/chef/pending`);
  }

  acceptChef(id: number, commentaire?: string) {
    return this.http.post<InterventionDto>(`${environment.apiUrl}/api/interventions/chef/${id}/accept`, {
      commentaire: commentaire ?? ''
    });
  }

  rejectChef(id: number, commentaire: string) {
    return this.http.post<InterventionDto>(`${environment.apiUrl}/api/interventions/chef/${id}/reject`, {
      commentaire
    });
  }

  pendingAdmin() {
    return this.http.get<InterventionDto[]>(`${environment.apiUrl}/api/interventions/admin/pending`);
  }

  startAdmin(id: number, repairMode: string) {
    return this.http.post<InterventionDto>(`${environment.apiUrl}/api/interventions/admin/${id}/start`, {
      repairMode
    });
  }

  completeAdmin(id: number, observation: string, dateReparation: string) {
    return this.http.post<InterventionDto>(`${environment.apiUrl}/api/interventions/admin/${id}/complete`, {
      observation,
      dateReparation
    });
  }

  repairAdmin(id: number) {
    return this.http.post<InterventionDto>(`${environment.apiUrl}/api/interventions/admin/${id}/repair`, {});
  }

  brokenAdmin(id: number) {
    return this.http.post<InterventionDto>(`${environment.apiUrl}/api/interventions/admin/${id}/broken`, {});
  }

  pendingDsn() {
    return this.pendingAdmin();
  }

  startDsn(id: number, repairMode: string) {
    return this.startAdmin(id, repairMode);
  }

  completeDsn(id: number, observation: string, dateReparation: string) {
    return this.completeAdmin(id, observation, dateReparation);
  }

  repairDsn(id: number) {
    return this.repairAdmin(id);
  }

  brokenDsn(id: number) {
    return this.brokenAdmin(id);
  }
}