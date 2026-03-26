import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import {
  RegisterRequest,
  RegisterResponse,
  ResendRegisterCodeRequest,
  ResendRegisterCodeResponse,
  VerifyRegisterCodeRequest,
  VerifyRegisterCodeResponse
} from '../models/auth.model';
import { tap } from 'rxjs';

const TOKEN_KEY = 'token';
const ROLE_KEY = 'role';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);

  login(body: any) {
    return this.http
      .post<{ token: string; role: string }>(`${environment.apiUrl}/api/auth/login`, body)
      .pipe(
        tap((res) => {
          if (!isPlatformBrowser(this.platformId)) return;
          localStorage.setItem(TOKEN_KEY, res.token);
          localStorage.setItem(ROLE_KEY, res.role);
        })
      );
  }

  register(body: RegisterRequest) {
    return this.http.post<RegisterResponse>(`${environment.apiUrl}/api/auth/register`, body);
  }

  verifyRegisterCode(body: VerifyRegisterCodeRequest) {
    return this.http.post<VerifyRegisterCodeResponse>(`${environment.apiUrl}/api/auth/register/verify`, body);
  }

  resendRegisterCode(body: ResendRegisterCodeRequest) {
    return this.http.post<ResendRegisterCodeResponse>(`${environment.apiUrl}/api/auth/register/resend`, body);
  }

  logout() {
    if (!isPlatformBrowser(this.platformId)) return;
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(ROLE_KEY);
  }

  get token(): string | null {
    if (!isPlatformBrowser(this.platformId)) return null;
    return localStorage.getItem(TOKEN_KEY);
  }

  get role(): string | null {
    if (!isPlatformBrowser(this.platformId)) return null;
    return localStorage.getItem(ROLE_KEY);
  }

  isLoggedIn(): boolean {
    return !!this.token;
  }
}