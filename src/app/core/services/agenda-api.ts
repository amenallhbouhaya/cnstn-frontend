import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { EvenementAgendaItem } from '../models/evenement-agenda';

@Injectable({ providedIn: 'root' })
export class AgendaApi {
  constructor(private http: HttpClient) {}

  responsableSalleAgenda() {
    return this.http.get<EvenementAgendaItem[]>(
      `${environment.apiUrl}/api/responsable-salle/evenements/agenda`
    );
  }
}
