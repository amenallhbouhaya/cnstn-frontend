// Auth API contracts used by the frontend, grouped by flow.

// Login payload.
export interface LoginRequest {
  email: string;
  password: string;
}

// Register flow: identity + credentials sent to the backend.
export interface RegisterRequest {
  nom: string;
  prenom: string;
  email: string;
  password: string;
  matricule: number;
  telephone: number;
}

// Backend may ask for email verification after register.
export interface RegisterResponse {
  message: string;
  email?: string;
  verificationRequired?: string;
}

// Verify the register code sent by email.
export interface VerifyRegisterCodeRequest {
  email: string;
  code: string;
}

export interface VerifyRegisterCodeResponse {
  message: string;
}

// Resend a register verification code.
export interface ResendRegisterCodeRequest {
  email: string;
}

export interface ResendRegisterCodeResponse {
  message: string;
}

// Forgot password: request a reset code.
export interface ForgotPasswordRequest {
  email: string;
}

export interface ForgotPasswordResponse {
  message: string;
  email?: string;
}

// Reset password with a code sent by email.
export interface ResetPasswordRequest {
  email: string;
  code: string;
  newPassword: string;
}

export interface ResetPasswordResponse {
  message: string;
}

// Auth success response (token + role) used across the app.
export interface AuthResponse {
  token: string;
  role: string;
}