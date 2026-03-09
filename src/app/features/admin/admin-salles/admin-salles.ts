import { Component, inject, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { SalleService } from '../../../core/services/salle';
import { Salle } from '../../../core/models/salle';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-admin-salles',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-salles.html',
  styleUrl: './admin-salles.scss'
})
export class AdminSallesComponent {
  private salleService = inject(SalleService);
  private fb = inject(FormBuilder);
  private cdr = inject(ChangeDetectorRef);

  salles: Salle[] = [];
  editingId: number | null = null;
  errorMsg = '';
  loading = false;

  form = this.fb.group({
    nom: ['', Validators.required],
    capacite: [1, [Validators.required, Validators.min(1)]],
    description: ['']
  });

  private platformId = inject(PLATFORM_ID);

ngOnInit() {
  if (!isPlatformBrowser(this.platformId)) return;
  this.load();
}

  load() {
    this.loading = true;
    this.salleService.getAll().subscribe({
      next: (data) => { this.salles = data; this.loading = false; this.cdr.detectChanges(); },
      error: () => { this.errorMsg = 'Erreur chargement salles'; this.loading = false; this.cdr.detectChanges(); }
    });
  }

  newSalle() {
    this.editingId = null;
    this.form.reset({ nom: '', capacite: 1, description: '' });
  }

  edit(s: Salle) {
    this.editingId = s.id ?? null;
    this.form.setValue({
      nom: s.nom,
      capacite: s.capacite,
      description: s.description ?? ''
    });
  }

  submit() {
    if (this.form.invalid) return;
    const payload = this.form.value as Salle;

    if (this.editingId === null) {
      this.salleService.add(payload).subscribe({
        next: () => { this.newSalle(); this.load(); },
        error: () => this.errorMsg = 'Erreur ajout salle'
      });
    } else {
      this.salleService.update(this.editingId, payload).subscribe({
        next: () => { this.editingId = null; this.load(); },
        error: () => this.errorMsg = 'Erreur modification salle'
      });
    }
  }

  remove(id?: number) {
    if (!id) return;
    this.salleService.delete(id).subscribe({
      next: () => this.load(),
      error: () => this.errorMsg = 'Erreur suppression salle'
    });
  }
}
