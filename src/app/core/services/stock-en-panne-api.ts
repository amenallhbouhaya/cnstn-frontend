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

@Injectable({ providedIn: 'root' })
export class StockEnPanneApi {
  constructor(private http: HttpClient) {}

  all() {
    return this.http.get<StockEnPanneItem[]>(`${environment.apiUrl}/api/stock-en-panne`);
  }
}
