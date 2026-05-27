import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export interface StockEnPanneItem {
  id: number;
  nomPiece: string;
  dateAjout: string;
  demandeurNom: string | null;
  demandeurTelephone: number | null;
  interventionId: number | null;
}

export interface RestoreStockEnPanneResponse {
  status: string;
  restoredEquipementId: number;
  restoredNom: string;
}

@Injectable({ providedIn: 'root' })
export class StockEnPanneApi {
  constructor(private http: HttpClient) {}

  // Handles the all flow for the current screen.
  all() {
    return this.http.get<StockEnPanneItem[]>(`${environment.apiUrl}/api/stock-en-panne`);
  }

  // Restores the archived item to its active state.
  restore(id: number) {
    return this.http.post<RestoreStockEnPanneResponse>(`${environment.apiUrl}/api/stock-en-panne/${id}/restore`, {});
  }
}
