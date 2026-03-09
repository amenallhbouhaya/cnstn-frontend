import { CanActivateFn, ActivatedRouteSnapshot, Router } from '@angular/router';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AuthService } from '../services/auth';

export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const platformId = inject(PLATFORM_ID);
  if (!isPlatformBrowser(platformId)) return true;

  const auth = inject(AuthService);
  const router = inject(Router);

  // ✅ خذ roles من route أو من parent (مهم للـchildren)
  const allowed =
    (route.data?.['roles'] as string[] | undefined) ??
    (route.parent?.data?.['roles'] as string[] | undefined);

  const role = auth.role;
  const normalize = (value: string) => value.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();

  if (!auth.isLoggedIn()) return router.parseUrl('/login');
  if (!allowed) return true; // إذا ما فماش roles محددة، خليه يمر

  const allowedNormalized = allowed.map(normalize);
  return role && allowedNormalized.includes(normalize(role)) ? true : router.parseUrl('/login');
};