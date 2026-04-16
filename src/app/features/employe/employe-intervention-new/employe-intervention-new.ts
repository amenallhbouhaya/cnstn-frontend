import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { InterventionApi } from '../../../core/services/intervention-api';
import { EquipementService } from '../../../core/services/equipement';
import { Equipement } from '../../../core/models/equipement';
import { AuthService } from '../../../core/services/auth';

@Component({
  selector: 'app-employe-intervention-new',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './employe-intervention-new.html',
  styleUrl: './employe-intervention-new.css'
})
export class EmployeInterventionNewComponent {
  private fb = inject(FormBuilder);
  private api = inject(InterventionApi);
  private equipApi = inject(EquipementService);
  private router = inject(Router);
  private auth = inject(AuthService);

  equipements: Equipement[] = [];
  selectedEquipId: number | null = null;

  loading = false;
  errorMsg = '';
  msg = '';

  private normalizeRole(value: string | null | undefined): string {
    return String(value ?? '').replace(/\s+/g, '').toLowerCase();
  }

  get backLink(): string {
    const role = this.normalizeRole(this.auth.role);
    if (role === 'admin') return '/admin';
    if (role === 'chefhierarchique' || role === 'chef-hierarchique') return '/chef-hierarchique';
    if (role === 'responsablesalle') return '/responsable-salle';
    if (role === 'responsablesecurite') return '/responsable-securite';
    if (role === 'directeurdsn') return '/directeur-dsn';
    return '/employe/interventions';
  }

  form = this.fb.group({
    nom: ['', Validators.required],
    typeAppareil: ['', Validators.required],
    numeroSerie: [''],
    descriptionPanne: ['', Validators.required]
  });

  ngOnInit() {
    // controller متاعك GET /Equipement
    this.equipApi.getAll().subscribe({
      next: (data: any) => this.equipements = data ?? [],
      error: (err) => console.log(err)
    });

  }

  onEquipementChange(value: string) {
    const id = value ? Number(value) : null;
    this.selectedEquipId = Number.isFinite(id as number) ? id : null;

    const eq = this.equipements.find((e) => e.id === this.selectedEquipId);
    if (eq) {
      this.form.patchValue({
        typeAppareil: String(eq.typeEquipement ?? ''),
        numeroSerie: eq.numeroSerie ?? ''
      });
    }
  }

  submit() {
    if (this.form.invalid) return;

    this.loading = true;
    this.errorMsg = '';
    this.msg = '';

    this.api.create({
      nom: this.form.value.nom!,
      typeAppareil: this.form.value.typeAppareil!,
      numeroSerie: this.form.value.numeroSerie!,
      descriptionPanne: this.form.value.descriptionPanne!,
      equipementIds: this.selectedEquipId ? [this.selectedEquipId] : []
    }).subscribe({
      next: () => {
        this.loading = false;
        this.msg = 'Demande envoyée';
        // بعد 0.8s نمشيو للقائمة
        setTimeout(() => this.router.navigate(['/employe/interventions']), 800);
      },
      error: (err) => {
        console.log(err);
        this.loading = false;
        this.errorMsg = 'Erreur envoi demande';
      }
    });
  }
}