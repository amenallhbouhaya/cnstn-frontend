import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

import { EvenementService } from '../../../core/services/evenement';
import { Evenement } from '../../../core/models/evenement';
import { TypeEvenement } from '../../../core/models/type-evenement';

@Component({
  selector: 'app-admin-evenements',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-evenements.html',
  styleUrl: './admin-evenements.scss'
})
export class AdminEvenementsComponent {
  private api = inject(EvenementService);
  private fb = inject(FormBuilder);

  items: Evenement[] = [];
  loading = false;
  errorMsg = '';
  editingId: number | null = null;

  typeValues = Object.values(TypeEvenement);

  form = this.fb.group({
    nom: [''],
    titre: ['', Validators.required],
    description: [''],
    dateDebut: ['', Validators.required], // datetime-local
    dateFin: ['', Validators.required],
    typeEvenement: [null as any, Validators.required],
  });

  ngOnInit() { this.load(); }

  load() {
    this.loading = true;
    this.errorMsg = '';
    this.api.getAll().subscribe({
      next: (data) => { this.items = data; this.loading = false; },
      error: (err) => { console.log(err); this.errorMsg = 'Erreur chargement événements'; this.loading = false; }
    });
  }

  newItem() {
    this.editingId = null;
    this.form.reset({ nom:'', titre:'', description:'', dateDebut:'', dateFin:'', typeEvenement: null });
  }

  edit(e: Evenement) {
    this.editingId = e.id ?? null;
    const dd = e.dateDebut ? new Date(e.dateDebut).toISOString().slice(0,16) : '';
    const df = e.dateFin ? new Date(e.dateFin).toISOString().slice(0,16) : '';

    this.form.setValue({
      nom: e.nom ?? '',
      titre: e.titre,
      description: e.description ?? '',
      dateDebut: dd,
      dateFin: df,
      typeEvenement: e.typeEvenement ?? null
    });
  }

  submit() {
    if (this.form.invalid) return;
    const raw = this.form.value as any;

    const payload: Evenement = {
      nom: raw.nom ?? '',
      titre: raw.titre,
      description: raw.description ?? '',
      dateDebut: new Date(raw.dateDebut).toISOString(),
      dateFin: new Date(raw.dateFin).toISOString(),
      typeEvenement: raw.typeEvenement
    };

    if (this.editingId === null) {
      this.api.add(payload).subscribe({
        next: () => { this.newItem(); this.load(); },
        error: (err) => { console.log(err); this.errorMsg = 'Erreur ajout événement'; }
      });
    } else {
      this.api.update(this.editingId, payload).subscribe({
        next: () => { this.editingId = null; this.load(); },
        error: (err) => { console.log(err); this.errorMsg = 'Erreur modification événement'; }
      });
    }
  }

  remove(id?: number) {
    if (!id) return;
    this.api.delete(id).subscribe({
      next: () => this.load(),
      error: (err) => { console.log(err); this.errorMsg = 'Erreur suppression événement'; }
    });
  }
}