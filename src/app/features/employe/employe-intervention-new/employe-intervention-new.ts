import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { InterventionApi } from '../../../core/services/intervention-api';
import { EquipementService } from '../../../core/services/equipement';

@Component({
  selector: 'app-employe-intervention-new',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './employe-intervention-new.html',
  styleUrl: './employe-intervention-new.scss'
})
export class EmployeInterventionNewComponent {
  private fb = inject(FormBuilder);
  private api = inject(InterventionApi);
  private equipApi = inject(EquipementService);
  private router = inject(Router);

  equipements: any[] = [];
  selectedIds = new Set<number>();

  loading = false;
  errorMsg = '';
  msg = '';

  form = this.fb.group({
    description: ['', Validators.required]
  });

  ngOnInit() {
    // controller متاعك GET /Equipement
    this.equipApi.getAll().subscribe({
      next: (data: any) => this.equipements = data ?? [],
      error: (err) => console.log(err)
    });
  }

  toggle(id: number, checked: boolean) {
    if (checked) this.selectedIds.add(id);
    else this.selectedIds.delete(id);
  }

  submit() {
    if (this.form.invalid) return;

    this.loading = true;
    this.errorMsg = '';
    this.msg = '';

    this.api.create({
      description: this.form.value.description!,
      equipementIds: Array.from(this.selectedIds)
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