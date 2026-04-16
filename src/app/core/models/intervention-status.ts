export type InterventionStatus =
  | 'EN_ATTENTE_CHEF'
  | 'REFUSEE_CHEF'
  | 'EN_ATTENTE_ADMIN'
  | 'EN_ATTENTE_DSN'
  | 'EN_COURS'
  | 'REPARE'
  | 'CASSE';

function normalizeInterventionStatus(status?: string | null): string {
  return String(status ?? '').trim().toUpperCase();
}

export function interventionStatusLabel(status?: string | null): string {
  const normalized = normalizeInterventionStatus(status);

  switch (normalized) {
    case 'EN_ATTENTE_CHEF':
      return 'En attente chef';
    case 'EN_ATTENTE_ADMIN':
    case 'EN_ATTENTE_DSN':
      return 'En attente admin';
    case 'EN_COURS':
      return 'En cours';
    case 'REPARE':
      return 'Repare';
    case 'CASSE':
      return 'Casse';
    case 'REFUSEE_CHEF':
      return 'Refusee chef';
    default:
      return String(status ?? '').trim() || '-';
  }
}

export function isInterventionBlockingStatus(status?: string | null): boolean {
  const normalized = normalizeInterventionStatus(status);
  return normalized === 'EN_ATTENTE_CHEF'
    || normalized === 'EN_ATTENTE_ADMIN'
    || normalized === 'EN_ATTENTE_DSN'
    || normalized === 'EN_COURS'
    || normalized === 'CASSE';
}

export function canAdminDecideIntervention(status?: string | null): boolean {
  const normalized = normalizeInterventionStatus(status);
  return normalized === 'EN_ATTENTE_ADMIN' || normalized === 'EN_ATTENTE_DSN' || normalized === 'EN_COURS';
}