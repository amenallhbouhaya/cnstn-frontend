import { CanActivateFn, Router } from '@angular/router';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AuthService } from '../services/auth';

// Handles the authGuard flow for the current screen.
export const authGuard: CanActivateFn = () => {
  const platformId = inject(PLATFORM_ID);

  // SSR: ما عندوش localStorage => نعدّيه
  if (!isPlatformBrowser(platformId)) return true;

  const auth = inject(AuthService);
  const router = inject(Router);

  // كانو داخل ولا لا؟ إذا لا، نرجّعو للـhome.
  return auth.isLoggedIn() ? true : router.parseUrl('/');
};