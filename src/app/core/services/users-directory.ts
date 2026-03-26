import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { UserDto } from '../models/user';

@Injectable({ providedIn: 'root' })
export class UsersDirectoryService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<UserDto[]>(`${environment.apiUrl}/api/users/list`);
  }
}
