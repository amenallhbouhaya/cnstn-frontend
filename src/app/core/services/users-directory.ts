import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { UserDto } from '../models/user';

@Injectable({ providedIn: 'root' })
export class UsersDirectoryService {
  constructor(private http: HttpClient) {}

  // Fetches all records for this API resource.
  getAll() {
    return this.http.get<UserDto[]>(`${environment.apiUrl}/Utilisateur/all`);
  }
}
