import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export interface InvitationView {
  evenementId: number;
  titre: string;
  description: string | null;
  salle: string | null;
  dateDebut: string;
  dateFin: string;
  organisateur: string | null;
  destinataire: string | null;
  referenceCode: string;
  usedAt: string | null;
  email: string | null;
  telephone: number | null;
}

@Injectable({ providedIn: 'root' })
export class InvitationsApi {
  constructor(private http: HttpClient) {}

  // Returns the requested data or derived value.
  getInvitation(id: number) {
    return this.http.get<InvitationView>(`${environment.apiUrl}/api/invitations/${id}`);
  }

  // Handles the checkInvitation flow for the current screen.
  checkInvitation(body: { referenceCode: string }) {
    return this.http.post<{
      status: string;
      message: string;
      invitation: InvitationView | null;
      usedAt: string | null;
    }>(`${environment.apiUrl}/api/invitations/check`, body);
  }

  // Handles the consumeInvitation flow for the current screen.
  consumeInvitation(body: { referenceCode: string }) {
    return this.http.post<{
      status: string;
      message: string;
      invitation: InvitationView | null;
      usedAt: string | null;
    }>(`${environment.apiUrl}/api/invitations/consume`, body);
  }
}
