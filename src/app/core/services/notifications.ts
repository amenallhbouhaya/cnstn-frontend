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

  // Fetches the current user items.
  my() {
    return this.http.get<AppNotification[]>(`${environment.apiUrl}/api/notifications/my`);
  }

  // Returns the unread notification count.
  unreadCount() {
    return this.http.get<{ count: number }>(`${environment.apiUrl}/api/notifications/unread-count`);
  }

  // Marks a single notification as read.
  markRead(id: number) {
    return this.http.put(`${environment.apiUrl}/api/notifications/${id}/read`, {});
  }

  // Marks every notification as read.
  markAllRead() {
    return this.http.put(`${environment.apiUrl}/api/notifications/read-all`, {});
  }
}
