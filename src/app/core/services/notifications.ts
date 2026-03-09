import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export interface AppNotification {
  id: number;
  message: string;
  type: string;
  targetPath: string;
  lu: boolean;
  dateCreation: string;
}

@Injectable({ providedIn: 'root' })
export class NotificationsApi {
  constructor(private http: HttpClient) {}

  my() {
    return this.http.get<AppNotification[]>(`${environment.apiUrl}/api/notifications/my`);
  }

  unreadCount() {
    return this.http.get<{ count: number }>(`${environment.apiUrl}/api/notifications/unread-count`);
  }

  markRead(id: number) {
    return this.http.put(`${environment.apiUrl}/api/notifications/${id}/read`, {});
  }

  markAllRead() {
    return this.http.put(`${environment.apiUrl}/api/notifications/read-all`, {});
  }
}
