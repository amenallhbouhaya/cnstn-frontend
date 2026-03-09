import { Component, inject, ChangeDetectorRef, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

import { EquipementService } from '../../../core/services/equipement';
import { Equipement } from '../../../core/models/equipement';
import { TypeEquipement } from '../../../core/models/type-equipement';

@Component({
  selector: 'app-admin-equipements',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-equipements.html',
  styleUrl: './admin-equipements.scss'
})
export class AdminEquipementsComponent {
  private api = inject(EquipementService);
  private fb = inject(FormBuilder);
  private cdr = inject(ChangeDetectorRef);

  items: Equipement[] = [];
  loading = false;
  errorMsg = '';
  editingId: number | null = null;

  typeValues = Object.values(TypeEquipement);

  form = this.fb.group({
    dateAquisation: ['', Validators.required], // input date => yyyy-mm-dd
    etat: ['', Validators.required],
    reservable: [true, Validators.required],
    typeEquipement: [null as any, Validators.required],
  });

  private platformId = inject(PLATFORM_ID);

  ngOnInit() {
    if (!isPlatformBrowser(this.platformId)) return;
    this.load();
  }

  load() {
    this.loading = true;
    this.errorMsg = '';

    this.api.getAll().subscribe({
      next: (data) => {
        this.items = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.log(err);
        this.errorMsg = 'Erreur chargement équipements';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  newItem() {
    this.editingId = null;
    this.form.reset({
      dateAquisation: '',
      etat: '',
      reservable: true,
      typeEquipement: null
    });
  }

  edit(e: Equipement) {
    this.editingId = e.id ?? null;

    // تحويل ISO -> yyyy-mm-dd
    const yyyyMmDd = e.dateAquisation
      ? new Date(e.dateAquisation).toISOString().slice(0, 10)
      : '';

    this.form.setValue({
      dateAquisation: yyyyMmDd,
      etat: e.etat ?? '',
      reservable: !!e.reservable,
      typeEquipement: e.typeEquipement ?? null
    });
  }

  submit() {
    if (this.form.invalid) return;

    const raw = this.form.value as any;

    const payload: Equipement = {
      dateAquisation: new Date(raw.dateAquisation).toISOString(),
      etat: raw.etat,
      reservable: !!raw.reservable,
      typeEquipement: raw.typeEquipement
    };

    if (this.editingId === null) {
      this.api.add(payload).subscribe({
        next: () => {
          this.newItem();
          this.load();
        },
        error: (err) => {
          console.log(err);
          this.errorMsg = 'Erreur ajout équipement';
        }
      });
    } else {
      this.api.update(this.editingId, payload).subscribe({
        next: () => {
          this.editingId = null;
          this.load();
        },
        error: (err) => {
          console.log(err);
          this.errorMsg = 'Erreur modification équipement';
        }
      });
    }
  }

  remove(id?: number) {
    if (!id) return;

    this.api.delete(id).subscribe({
      next: () => this.load(),
      error: (err) => {
        console.log(err);
        this.errorMsg = 'Erreur suppression équipement';
      }
    });
  }
}