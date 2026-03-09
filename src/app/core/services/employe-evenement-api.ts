import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { TypeEvenement } from '../models/type-evenement';

export interface SalleMini { id: number; nom: string; capacite: number; description?: string; }
export interface EquipMini { id: number; etat: string; reservable: boolean; typeEquipement: string; }
export interface EquipAvailability extends EquipMini { available: boolean; }

@Injectable({ providedIn: 'root' })
export class EmployeEvenementApi {
  constructor(private http: HttpClient) {}

  myEvents() {
    return this.http.get<any[]>(`${environment.apiUrl}/Evenement/my`);
  }

  sallesDisponibles(dateDebut?: number | null, dateFin?: number | null) {
    let params = new HttpParams();

    if (dateDebut != null) params = params.set('dateDebut', String(dateDebut));
    if (dateFin != null) params = params.set('dateFin', String(dateFin));

    return this.http.get<SalleMini[]>(`${environment.apiUrl}/Evenement/salles`, { params });
  }

  reservedSlots(date: string) {
    const params = new HttpParams().set('date', date);
    return this.http.get<string[]>(`${environment.apiUrl}/Evenement/reserved-slots`, { params });
  }

  availableSallesApi(start: string, end: string) {
    const params = new HttpParams()
      .set('start', start)
      .set('end', end);
    return this.http.get<SalleMini[]>(`${environment.apiUrl}/api/salles/available`, { params });
  }

  availableEquipementsApi(start: string, end: string) {
    const params = new HttpParams()
      .set('start', start)
      .set('end', end);
    return this.http.get<EquipMini[]>(`${environment.apiUrl}/api/equipements/available`, { params });
  }

  availableEquipementsStatusApi(start: string, end: string) {
    const params = new HttpParams()
      .set('start', start)
      .set('end', end);
    return this.http.get<EquipAvailability[]>(`${environment.apiUrl}/api/equipements/availability`, { params });
  }

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
    salleId?: number | null;
    equipementIds?: number[];
  }) {
    return this.http.post(`${environment.apiUrl}/Evenement/add-full`, body);
  }
}