import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { finalize } from 'rxjs';

import { DocumentApi } from '../../../core/services/document-api';

@Component({
  selector: 'app-dsn-document-new',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './dsn-document-new.html',
  styleUrl: './dsn-document-new.css'
})
export class DsnDocumentNewComponent {
  private fb = inject(FormBuilder);
  private docApi = inject(DocumentApi);
  loadingSend = false;

  selectedFile: File | null = null;
  errorMsg = '';
  msg = '';

  form = this.fb.group({
    titre: ['', Validators.required],
    niveauAcces: ['']
  });

  // Stores the file chosen in the file picker.
  onFileSelected(ev: Event) {
    const input = ev.target as HTMLInputElement;
    this.selectedFile = input.files?.[0] ?? null;
  }

  // Validates the form and sends it to the backend.
  submit() {
    const titre = (this.form.value.titre ?? '').trim();
    const niveauAcces = (this.form.value.niveauAcces ?? '').trim();

    if (!titre) {
      this.errorMsg = 'Titre document obligatoire';
      return;
    }
    if (!this.selectedFile) {
      this.errorMsg = 'Veuillez choisir un fichier';
      return;
    }

    this.errorMsg = '';
    this.msg = '';
    this.loadingSend = true;

    this.docApi.sendToEmployes(this.selectedFile, titre, niveauAcces || undefined)
      .pipe(finalize(() => this.loadingSend = false))
      .subscribe({
        next: () => {
          this.msg = 'Document envoyé à tous les employés avec succès';
          this.form.reset({ titre: '', niveauAcces: '' });
          this.selectedFile = null;
        },
        error: (err: unknown) => {
          console.log(err);
          this.errorMsg = 'Erreur envoi document';
        }
      });
  }
}
