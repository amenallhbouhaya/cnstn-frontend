import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

import { ServicesApi } from '../../../core/services/services-api';
import { ServiceItem } from '../../../core/models/service';

@Component({
  selector: 'app-admin-services',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-services.html',
  styleUrl: './admin-services.scss'
})
export class AdminServicesComponent {
  private api = inject(ServicesApi);
  private fb = inject(FormBuilder);

  items: ServiceItem[] = [];
  loading = false;
  errorMsg = '';
  editingId: number | null = null;

  form = this.fb.group({
    nom: ['', Validators.required],
  });

  ngOnInit() {
    this.load();
  }

  load() {
    this.loading = true;
    this.errorMsg = '';
    this.api.getAll().subscribe({
      next: (data) => { this.items = data; this.loading = false; },
      error: (err) => { console.log(err); this.errorMsg = 'Erreur chargement services'; this.loading = false; }
    });
  }

  newItem() {
    this.editingId = null;
    this.form.reset({ nom: '' });
  }

  edit(s: ServiceItem) {
    this.editingId = s.id ?? null;
    this.form.setValue({ nom: s.nom });
  }

  submit() {
    if (this.form.invalid) return;
    const payload: ServiceItem = { nom: this.form.value.nom! };

    if (this.editingId === null) {
      this.api.add(payload).subscribe({
        next: () => { this.newItem(); this.load(); },
        error: (err) => { console.log(err); this.errorMsg = 'Erreur ajout service'; }
      });
    } else {
      this.api.update(this.editingId, payload).subscribe({
        next: () => { this.editingId = null; this.load(); },
        error: (err) => { console.log(err); this.errorMsg = 'Erreur modification service'; }
      });
    }
  }

  remove(id?: number) {
    if (!id) return;
    this.api.delete(id).subscribe({
      next: () => this.load(),
      error: (err) => { console.log(err); this.errorMsg = 'Erreur suppression service'; }
    });
  }
}