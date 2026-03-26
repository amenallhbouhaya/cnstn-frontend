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
  email?: string;
  verificationRequired?: string;
}

export interface VerifyRegisterCodeRequest {
  email: string;
  code: string;
}

export interface VerifyRegisterCodeResponse {
  message: string;
}

export interface ResendRegisterCodeRequest {
  email: string;
}

export interface ResendRegisterCodeResponse {
  message: string;
}

export interface AuthResponse {
  token: string;
  role: string;
}