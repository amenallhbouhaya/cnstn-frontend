export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  nom: string;
  prenom: string;
  email: string;
  password: string;
  matricule: number;
  telephone: number;
}

export interface RegisterResponse {
  message: string;
}

export interface AuthResponse {
  token: string;
  role: string;
}