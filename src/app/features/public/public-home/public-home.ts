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
	styleUrl: './public-home.scss'
})
export class PublicHomeComponent {
	private postsStore = inject(PublicPostsStore);
	private fb = inject(FormBuilder);
	private auth = inject(AuthService);
	private router = inject(Router);

	readonly year = new Date().getFullYear();
	showLoginModal = false;
	modalMode: 'login' | 'register' = 'login';
	errorMsg = '';
	registerErrorMsg = '';
	registerSuccessMsg = '';
	verifyErrorMsg = '';
	verifySuccessMsg = '';
	resendMsg = '';
	verificationCode = '';
	verificationEmail = '';
	awaitingEmailVerification = false;

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

	get news(): PublicPost[] {
		return this.postsStore.posts();
	}

	openLoginModal(): void {
		this.showLoginModal = true;
		this.modalMode = 'login';
		this.errorMsg = '';
		this.registerErrorMsg = '';
		this.registerSuccessMsg = '';
		this.resetVerificationState();
	}

	openRegisterModal(): void {
		this.showLoginModal = true;
		this.modalMode = 'register';
		this.errorMsg = '';
		this.registerErrorMsg = '';
		this.registerSuccessMsg = '';
		this.resetVerificationState();
	}

	closeLoginModal(): void {
		this.showLoginModal = false;
		this.modalMode = 'login';
		this.errorMsg = '';
		this.registerErrorMsg = '';
		this.registerSuccessMsg = '';
		this.resetVerificationState();
	}

	switchToLogin(): void {
		this.modalMode = 'login';
		this.errorMsg = '';
	}

	switchToRegister(): void {
		this.modalMode = 'register';
		this.registerErrorMsg = '';
		this.registerSuccessMsg = '';
		this.resetVerificationState();
	}

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

	private resetVerificationState(): void {
		this.awaitingEmailVerification = false;
		this.verificationCode = '';
		this.verificationEmail = '';
		this.resendMsg = '';
		this.verifyErrorMsg = '';
		this.verifySuccessMsg = '';
	}
}
