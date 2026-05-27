import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { TypeEvenement } from '../models/type-evenement';

export interface SalleMini { id: number; nom: string; capacite: number; description?: string; }
export interface EquipMini { id: number; etat: string; reservable: boolean; typeEquipement: string; }
export interface EquipAvailability extends EquipMini { available: boolean; }
export interface ExternalPartnerPayload { nom: string; email: string; }

@Injectable({ providedIn: 'root' })
export class EmployeEvenementApi {
  constructor(private http: HttpClient) {}

  // Handles the myEvents flow for the current screen.
  myEvents() {
    return this.http.get<any[]>(`${environment.apiUrl}/Evenement/my`);
  }

  // Handles the allEvents flow for the current screen.
  allEvents() {
    return this.http.get<any[]>(`${environment.apiUrl}/Evenement/all`);
  }

  // Handles the sallesDisponibles flow for the current screen.
  sallesDisponibles(dateDebut?: number | null, dateFin?: number | null) {
    let params = new HttpParams();

    if (dateDebut != null) params = params.set('dateDebut', String(dateDebut));
    if (dateFin != null) params = params.set('dateFin', String(dateFin));

    return this.http.get<SalleMini[]>(`${environment.apiUrl}/Evenement/salles`, { params });
  }

  // Handles the reservedSlots flow for the current screen.
  reservedSlots(date: string) {
    const params = new HttpParams().set('date', date);
    return this.http.get<string[]>(`${environment.apiUrl}/Evenement/reserved-slots`, { params });
  }

  // Handles the availableSallesApi flow for the current screen.
  availableSallesApi(start: string, end: string) {
    const params = new HttpParams()
      .set('start', start)
      .set('end', end);
    return this.http.get<SalleMini[]>(`${environment.apiUrl}/api/salles/available`, { params });
  }

  // Handles the availableEquipementsApi flow for the current screen.
  availableEquipementsApi(start: string, end: string) {
    const params = new HttpParams()
      .set('start', start)
      .set('end', end);
    return this.http.get<EquipMini[]>(`${environment.apiUrl}/api/equipements/available`, { params });
  }

  // Handles the availableEquipementsStatusApi flow for the current screen.
  availableEquipementsStatusApi(start: string, end: string) {
    const params = new HttpParams()
      .set('start', start)
      .set('end', end);
    return this.http.get<EquipAvailability[]>(`${environment.apiUrl}/api/equipements/availability`, { params });
  }

  // Handles the equipementsDisponibles flow for the current screen.
  equipementsDisponibles() {
    return this.http.get<EquipMini[]>(`${environment.apiUrl}/Evenement/equipements`);
  }

  createEvenementFull(body: {
    nom?: string;
    titre: string;
    description?: string;
    dateDebut: number;
    dateFin: number;
    typeEvenement: TypeEvenement;
    lienEnLigne?: string;
    salleId?: number | null;
    equipementIds?: number[];
    inviteAll?: boolean;
    inviteUserIds?: number[];
    partenairesExternes?: ExternalPartnerPayload[];
  }) {
    return this.http.post(`${environment.apiUrl}/Evenement/add-full`, body);
  }
}