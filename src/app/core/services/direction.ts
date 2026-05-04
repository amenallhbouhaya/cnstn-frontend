import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class DirectionService {
  private readonly baseUrl = `${environment.apiUrl}/api/directions`;

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get(this.baseUrl);
  }
}