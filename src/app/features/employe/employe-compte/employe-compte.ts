import { Component, inject, ChangeDetectorRef, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { UserMeApi } from '../../../core/services/user-me-api';

@Component({
  selector: 'app-employe-compte',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './employe-compte.html',
  styleUrl: './employe-compte.css'
})
export class EmployeCompteComponent {
  private api = inject(UserMeApi);
  private fb = inject(FormBuilder);
  private cdr = inject(ChangeDetectorRef);
  private platformId = inject(PLATFORM_ID);

  loading = false;
  msg = '';
  errorMsg = '';

  meEmail = '';
  meRole = '';
  meMatricule = 0;
  meService = '';

  profileForm = this.fb.group({
    nom: ['', Validators.required],
    prenom: ['', Validators.required],
    poste: [''],
    adresse: [''],
    telephone: [0, Validators.required],
  });

  passForm = this.fb.group({
    oldPassword: ['', Validators.required],
    newPassword: ['', Validators.required],
  });

  ngOnInit() {
    if (!isPlatformBrowser(this.platformId)) return;
    this.loadMe();
    this.loadPhoto();
  }

  loadMe() {
  this.loading = true;
  this.errorMsg = '';
  this.msg = '';

  this.api.me().subscribe({
    next: (me) => {
      console.log('ME:', me);

      this.meEmail = me.email;
      this.meRole = me.role;
      this.meMatricule = me.matricule;
      this.meService = me.serviceNom ?? '';

      this.profileForm.patchValue({
        nom: me.nom,
        prenom: me.prenom,
        poste: me.poste ?? '',
        adresse: me.adresse ?? '',
        telephone: me.telephone ?? 0
      });

      this.loading = false;
      this.cdr.detectChanges();
    },
    error: (err) => {
      console.log('ME ERROR:', err);
      this.errorMsg = 'Impossible de charger le profil';
      this.loading = false;
      this.cdr.detectChanges();
    }
  });
}

  saveProfile() {
    if (this.profileForm.invalid) return;

    this.msg = '';
    this.errorMsg = '';
    const v = this.profileForm.value as any;

    this.api.updateMe({
      nom: v.nom,
      prenom: v.prenom,
      poste: v.poste ?? '',
      adresse: v.adresse ?? '',
      telephone: Number(v.telephone)
    }).subscribe({
      next: () => { this.msg = 'Profil mis à jour'; this.cdr.detectChanges(); },
      error: (err) => { console.log(err); this.errorMsg = 'Erreur mise à jour profil'; this.cdr.detectChanges(); }
    });
  }

  savePassword() {
    if (this.passForm.invalid) return;

    this.msg = '';
    this.errorMsg = '';
    const v = this.passForm.value as any;

    this.api.changePassword({
      oldPassword: v.oldPassword,
      newPassword: v.newPassword
    }).subscribe({
      next: () => {
        this.msg = 'Mot de passe changé';
        this.passForm.reset({ oldPassword: '', newPassword: '' });
        this.cdr.detectChanges();
      },
      error: (err) => { console.log(err); this.errorMsg = 'Erreur changement mot de passe'; this.cdr.detectChanges(); }
    });
  }
  photoUrl: string | null = null;

loadPhoto() {
  this.api.getPhoto().subscribe({
    next: (blob) => {
      // إذا كان ثمّة photo قديمة نعملولها cleanup
      if (this.photoUrl) URL.revokeObjectURL(this.photoUrl);
      this.photoUrl = URL.createObjectURL(blob);
    },
    error: () => {
      this.photoUrl = null; // إذا 404 مثلا
    }
  });
}

onPhotoSelected(event: Event) {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  if (!file) return;

  this.errorMsg = '';
  this.msg = '';

  this.api.uploadPhoto(file).subscribe({
    next: () => {
      this.msg = 'Photo mise à jour';
      this.loadPhoto();
      input.value = ''; // reset
    },
    error: (err) => {
      console.log(err);
      this.errorMsg = 'Erreur upload photo';
    }
  });
}
}