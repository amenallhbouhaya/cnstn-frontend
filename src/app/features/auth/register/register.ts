import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { AuthService } from '../../../core/services/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, NgIf],
  templateUrl: './register.html'
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);

  errorMsg = '';
  successMsg = '';

  form = this.fb.group({
    nom: ['', Validators.required],
    prenom: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    matricule: [null as any, Validators.required],
    telephone: [null as any, Validators.required],
  });

  submit() {
    if (this.form.invalid) return;

    this.errorMsg = '';
    this.successMsg = '';

    this.auth.register(this.form.value as any).subscribe({
      next: (res) => {
        this.successMsg = res?.message ?? 'Demande envoyée. En attente de validation chef hiérarchique.';
        this.form.reset();
      },
      error: (err) => this.errorMsg = err?.error?.message ?? 'Register failed'
    });
  }
}