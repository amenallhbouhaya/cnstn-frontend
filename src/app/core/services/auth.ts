import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import {
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  RegisterRequest,
  RegisterResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
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

  // Login => store token/role in localStorage for later guards/requests.
  login(body: any) {
    return this.http
      .post<{ token: string; role: string }>(`${environment.apiUrl}/api/auth/login`, body)
      .pipe(
        tap((res) => {
          // SSR has no localStorage, so skip when running on server.
          if (!isPlatformBrowser(this.platformId)) return;
          localStorage.setItem(TOKEN_KEY, res.token);
          localStorage.setItem(ROLE_KEY, res.role);
        })
      );
  }

  // Registration + email verification flow.
  register(body: RegisterRequest) {
    return this.http.post<RegisterResponse>(`${environment.apiUrl}/api/auth/register`, body);
  }

  // Handles the verifyRegisterCode flow for the current screen.
  verifyRegisterCode(body: VerifyRegisterCodeRequest) {
    return this.http.post<VerifyRegisterCodeResponse>(`${environment.apiUrl}/api/auth/register/verify`, body);
  }

  // Handles the resendRegisterCode flow for the current screen.
  resendRegisterCode(body: ResendRegisterCodeRequest) {
    return this.http.post<ResendRegisterCodeResponse>(`${environment.apiUrl}/api/auth/register/resend`, body);
  }

  // Password reset flow.
  forgotPassword(body: ForgotPasswordRequest) {
    return this.http.post<ForgotPasswordResponse>(`${environment.apiUrl}/api/auth/password/forgot`, body);
  }

  // Clears the current form or component state.
  resetPassword(body: ResetPasswordRequest) {
    return this.http.post<ResetPasswordResponse>(`${environment.apiUrl}/api/auth/password/reset`, body);
  }

  // Clear local session data.
  logout() {
    if (!isPlatformBrowser(this.platformId)) return;
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(ROLE_KEY);
  }

  // Read token from localStorage (browser only).
  get token(): string | null {
    if (!isPlatformBrowser(this.platformId)) return null;
    return localStorage.getItem(TOKEN_KEY);
  }

  // Read role from localStorage (browser only).
  get role(): string | null {
    if (!isPlatformBrowser(this.platformId)) return null;
    return localStorage.getItem(ROLE_KEY);
  }

  // Simple auth check used by guards.
  isLoggedIn(): boolean {
    return !!this.token;
  }
}