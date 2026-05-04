import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ServiceItem } from '../models/service';

@Injectable({ providedIn: 'root' })
export class ServicesApi {
  private readonly baseUrl = `${environment.apiUrl}/api/services`;

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<ServiceItem[]>(this.baseUrl);
  }

  add(body: ServiceItem) {
    return this.http.post<ServiceItem>(this.baseUrl, body);
  }

  update(id: number, body: ServiceItem) {
    return this.http.put<ServiceItem>(`${this.baseUrl}/${id}`, body);
  }

  delete(id: number) {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}