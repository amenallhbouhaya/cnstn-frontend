import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ServiceItem } from '../models/service';

@Injectable({ providedIn: 'root' })
export class ServicesApi {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<ServiceItem[]>(`${environment.apiUrl}/services/all`);
  }

  add(body: ServiceItem) {
    return this.http.post<ServiceItem>(`${environment.apiUrl}/services/add`, body);
  }

  update(id: number, body: ServiceItem) {
    return this.http.put<ServiceItem>(`${environment.apiUrl}/services/${id}`, body);
  }

  delete(id: number) {
    return this.http.delete(`${environment.apiUrl}/services/${id}`, {
      responseType: 'text' as const
    });
  }
}