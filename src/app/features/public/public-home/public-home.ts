import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PublicPost } from '../../../core/models/public-post';
import { PublicPostsStore } from '../../../core/services/public-posts-store';
import { AuthService } from '../../../core/services/auth';

@Component({
	selector: 'app-public-home',
	standalone: true,
	imports: [CommonModule, RouterLink, ReactiveFormsModule, FormsModule],
	templateUrl: './public-home.html',
	styleUrl: './public-home.css'
})
export class PublicHomeComponent {
	private postsStore = inject(PublicPostsStore);
	private fb = inject(FormBuilder);
	private auth = inject(AuthService);
	private router = inject(Router);

	readonly year = new Date().getFullYear();
	showLoginModal = false;
	modalMode: 'login' | 'register' | 'forgot-password' = 'login';
	errorMsg = '';
	registerErrorMsg = '';
	registerSuccessMsg = '';
	verifyErrorMsg = '';
	verifySuccessMsg = '';
	resendMsg = '';
	verificationCode = '';
	verificationEmail = '';
	awaitingEmailVerification = false;
	forgotErrorMsg = '';
	forgotSuccessMsg = '';
	awaitingPasswordResetCode = false;
	passwordResetEmail = '';

	form = this.fb.group({
		email: ['', [Validators.required, Validators.email]],
		password: ['', Validators.required]
	});

	registerForm = this.fb.group({
		nom: ['', Validators.required],
		prenom: ['', Validators.required],
		email: ['', [Validators.required, Validators.email]],
		password: ['', Validators.required],
		matricule: [null as number | null, Validators.required],
		telephone: [null as number | null, Validators.required]
	});

	forgotRequestForm = this.fb.group({
		email: ['', [Validators.required, Validators.email]]
	});

	forgotResetForm = this.fb.group({
		code: ['', Validators.required],
		newPassword: ['', [Validators.required, Validators.minLength(6)]]
	});

	// Handles the news flow for the current screen.
	get news(): PublicPost[] {
		return this.postsStore.posts();
	}

	// Handles the openLoginModal flow for the current screen.
	openLoginModal(): void {
		this.showLoginModal = true;
		this.modalMode = 'login';
		this.errorMsg = '';
		this.registerErrorMsg = '';
		this.registerSuccessMsg = '';
		this.resetVerificationState();
		this.resetForgotPasswordState();
	}

	// Handles the openRegisterModal flow for the current screen.
	openRegisterModal(): void {
		this.showLoginModal = true;
		this.modalMode = 'register';
		this.errorMsg = '';
		this.registerErrorMsg = '';
		this.registerSuccessMsg = '';
		this.resetVerificationState();
		this.resetForgotPasswordState();
	}

	// Handles the closeLoginModal flow for the current screen.
	closeLoginModal(): void {
		this.showLoginModal = false;
		this.modalMode = 'login';
		this.errorMsg = '';
		this.registerErrorMsg = '';
		this.registerSuccessMsg = '';
		this.resetVerificationState();
		this.resetForgotPasswordState();
	}

	// Handles the switchToLogin flow for the current screen.
	switchToLogin(): void {
		this.modalMode = 'login';
		this.errorMsg = '';
		this.resetForgotPasswordState();
	}

	// Handles the switchToRegister flow for the current screen.
	switchToRegister(): void {
		this.modalMode = 'register';
		this.registerErrorMsg = '';
		this.registerSuccessMsg = '';
		this.resetVerificationState();
		this.resetForgotPasswordState();
	}

	// Handles the switchToForgotPassword flow for the current screen.
	switchToForgotPassword(): void {
		this.modalMode = 'forgot-password';
		this.errorMsg = '';
		this.registerErrorMsg = '';
		this.registerSuccessMsg = '';
		this.resetVerificationState();
		this.resetForgotPasswordState();

		const currentLoginEmail = String(this.form.value.email ?? '').trim();
		if (currentLoginEmail) {
			this.forgotRequestForm.patchValue({ email: currentLoginEmail });
		}
	}

	// Handles the submitLogin flow for the current screen.
	submitLogin(): void {
		if (this.form.invalid) {
			this.form.markAllAsTouched();
			return;
		}

		this.errorMsg = '';
		this.auth.login(this.form.value as any).subscribe({
			next: (res) => {
				this.closeLoginModal();
				const role = String(res.role ?? '');
				const normalizedRole = role.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();

				if (normalizedRole === 'admin') this.router.navigate(['/admin']);
				else if (normalizedRole === 'employe') this.router.navigate(['/employe']);
				else if (normalizedRole === 'responsablesalle') this.router.navigate(['/responsable-salle']);
				else if (normalizedRole === 'responsablesecurite') this.router.navigate(['/responsable-securite']);
				else if (normalizedRole === 'directeurdsn') this.router.navigate(['/directeur-dsn']);
				else if (normalizedRole === 'chefhierarchique') this.router.navigate(['/chef-hierarchique']);
				else this.router.navigate(['/employe']);
			},
			error: () => {
				this.errorMsg = 'Login incorrect';
			}
		});
	}

	// Handles the submitRegister flow for the current screen.
	submitRegister(): void {
		if (this.awaitingEmailVerification) {
			this.submitVerifyCode();
			return;
		}

		if (this.registerForm.invalid) {
			this.registerForm.markAllAsTouched();
			return;
		}

		this.registerErrorMsg = '';
		this.registerSuccessMsg = '';
		this.resendMsg = '';
		this.verifyErrorMsg = '';
		this.verifySuccessMsg = '';

		this.auth.register(this.registerForm.value as any).subscribe({
			next: (res) => {
				this.awaitingEmailVerification = true;
				this.verificationEmail = String(res?.email ?? this.registerForm.value.email ?? '');
				this.registerSuccessMsg = res?.message ?? 'Code envoye par email.';
				this.verifyErrorMsg = '';
				this.verifySuccessMsg = '';
				this.resendMsg = '';
			},
			error: (err) => {
				this.registerErrorMsg = err?.error?.message ?? 'Register failed';
			}
		});
	}

	// Handles the submitVerifyCode flow for the current screen.
	submitVerifyCode(): void {
		this.verifyErrorMsg = '';
		this.verifySuccessMsg = '';

		const email = String(this.verificationEmail || this.registerForm.value.email || '').trim().toLowerCase();
		const code = String(this.verificationCode || '').trim();
		if (!code) {
			this.verifyErrorMsg = 'Code de verification obligatoire';
			return;
		}

		this.auth.verifyRegisterCode({
			email,
			code
		}).subscribe({
			next: (res) => {
				this.verifySuccessMsg =
					res?.message ?? 'Email verifie. Demande transmise pour validation.';
				this.resendMsg = '';
				this.registerForm.reset();
				this.verificationCode = '';
				this.awaitingEmailVerification = false;
			},
			error: (err) => {
				this.verifyErrorMsg = err?.error?.message ?? 'Verification failed';
			}
		});
	}

	// Handles the resendVerificationCode flow for the current screen.
	resendVerificationCode(): void {
		this.verifyErrorMsg = '';
		this.verifySuccessMsg = '';
		this.resendMsg = '';

		if (!this.verificationEmail) {
			this.verifyErrorMsg = 'Email introuvable pour renvoi du code';
			return;
		}

		this.auth.resendRegisterCode({ email: this.verificationEmail }).subscribe({
			next: (res) => {
				this.resendMsg = res?.message ?? 'Code renvoye par email.';
			},
			error: (err) => {
				this.verifyErrorMsg = err?.error?.message ?? 'Echec renvoi code';
			}
		});
	}

	// Handles the requestPasswordResetCode flow for the current screen.
	requestPasswordResetCode(): void {
		if (this.forgotRequestForm.invalid) {
			this.forgotRequestForm.markAllAsTouched();
			return;
		}

		this.forgotErrorMsg = '';
		this.forgotSuccessMsg = '';

		const email = String(this.forgotRequestForm.value.email ?? '').trim().toLowerCase();
		this.auth.forgotPassword({ email }).subscribe({
			next: (res) => {
				this.awaitingPasswordResetCode = true;
				this.passwordResetEmail = String(res?.email ?? email).trim().toLowerCase();
				this.forgotSuccessMsg = res?.message ?? 'Code de reinitialisation envoye par email.';
				this.forgotResetForm.reset();
			},
			error: (err) => {
				this.forgotErrorMsg = err?.error?.message ?? 'Echec envoi code';
			}
		});
	}

	// Handles the submitPasswordReset flow for the current screen.
	submitPasswordReset(): void {
		if (!this.awaitingPasswordResetCode) {
			this.requestPasswordResetCode();
			return;
		}

		if (this.forgotResetForm.invalid) {
			this.forgotResetForm.markAllAsTouched();
			return;
		}

		this.forgotErrorMsg = '';
		this.forgotSuccessMsg = '';

		const code = String(this.forgotResetForm.value.code ?? '').trim();
		const newPassword = String(this.forgotResetForm.value.newPassword ?? '').trim();
		this.auth.resetPassword({
			email: this.passwordResetEmail,
			code,
			newPassword
		}).subscribe({
			next: (res) => {
				this.forgotSuccessMsg = res?.message ?? 'Mot de passe reinitialise avec succes.';
				this.awaitingPasswordResetCode = false;
				this.forgotResetForm.reset();
			},
			error: (err) => {
				this.forgotErrorMsg = err?.error?.message ?? 'Echec reinitialisation mot de passe';
			}
		});
	}

	// Handles the resendPasswordResetCode flow for the current screen.
	resendPasswordResetCode(): void {
		if (!this.passwordResetEmail) {
			this.forgotErrorMsg = 'Email introuvable pour renvoi du code';
			return;
		}

		this.forgotErrorMsg = '';
		this.forgotSuccessMsg = '';

		this.auth.forgotPassword({ email: this.passwordResetEmail }).subscribe({
			next: (res) => {
				this.forgotSuccessMsg = res?.message ?? 'Code de reinitialisation renvoye par email.';
			},
			error: (err) => {
				this.forgotErrorMsg = err?.error?.message ?? 'Echec renvoi code';
			}
		});
	}

	// Clears the current form or component state.
	private resetForgotPasswordState(): void {
		this.awaitingPasswordResetCode = false;
		this.passwordResetEmail = '';
		this.forgotErrorMsg = '';
		this.forgotSuccessMsg = '';
		this.forgotRequestForm.reset();
		this.forgotResetForm.reset();
	}

	// Clears the current form or component state.
	private resetVerificationState(): void {
		this.awaitingEmailVerification = false;
		this.verificationCode = '';
		this.verificationEmail = '';
		this.resendMsg = '';
		this.verifyErrorMsg = '';
		this.verifySuccessMsg = '';
	}
}
