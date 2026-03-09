import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, NgIf],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);

  errorMsg = '';

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  submit() {
    if (this.form.invalid) return;

    this.auth.login(this.form.value as any).subscribe({
      next: (res) => {
        // res.role موجودة + auth.role موجودة
        const role = String(res.role);
        const normalizedRole = role.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();

        if (normalizedRole === 'admin') this.router.navigate(['/admin']);
        else if (normalizedRole === 'employe') this.router.navigate(['/employe']);
        else if (normalizedRole === 'responsablesalle') this.router.navigate(['/responsable-salle']);
        else if (normalizedRole === 'responsablesecurite') this.router.navigate(['/responsable-securite']);
        else if (normalizedRole === 'directeurdsn') this.router.navigate(['/directeur-dsn']);
        else if (normalizedRole === 'chefhierarchique') this.router.navigate(['/chef-hierarchique']);
        else this.router.navigate(['/employe']);
      },
      error: () => (this.errorMsg = 'Login incorrect')
    });
  }
}