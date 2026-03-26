import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { PublicPost } from '../../../core/models/public-post';
import { PublicPostsStore } from '../../../core/services/public-posts-store';

@Component({
  selector: 'app-admin-posts',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-posts.html',
  styleUrl: './admin-posts.scss'
})
export class AdminPostsComponent {
  private fb = inject(FormBuilder);
  private postsStore = inject(PublicPostsStore);

  editingId: number | null = null;
  selectedImageName = '';
  uploadError = '';

  readonly form = this.fb.group({
    title: ['', Validators.required],
    description: ['', [Validators.required, Validators.minLength(20)]],
    imageUrl: ['', Validators.required]
  });

  get items(): PublicPost[] {
    return this.postsStore.posts();
  }

  newItem() {
    this.editingId = null;
    this.selectedImageName = '';
    this.uploadError = '';
    this.form.reset({ title: '', description: '', imageUrl: '' });
  }

  edit(item: PublicPost) {
    this.editingId = item.id;
    this.selectedImageName = 'Image actuelle';
    this.uploadError = '';
    this.form.setValue({
      title: item.title,
      description: item.description,
      imageUrl: item.imageUrl
    });
  }

  onImageSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    this.uploadError = '';
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      this.uploadError = 'Veuillez choisir un fichier image valide.';
      this.form.patchValue({ imageUrl: '' });
      input.value = '';
      return;
    }

    this.selectedImageName = file.name;
    const reader = new FileReader();

    reader.onload = () => {
      const result = typeof reader.result === 'string' ? reader.result : '';
      this.form.patchValue({ imageUrl: result });
      this.form.get('imageUrl')?.markAsDirty();
      this.form.get('imageUrl')?.updateValueAndValidity();
    };

    reader.onerror = () => {
      this.uploadError = 'Erreur lors de la lecture du fichier.';
      this.form.patchValue({ imageUrl: '' });
    };

    reader.readAsDataURL(file);
  }

  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload = {
      title: this.form.value.title ?? '',
      description: this.form.value.description ?? '',
      imageUrl: this.form.value.imageUrl ?? ''
    };

    if (this.editingId === null) {
      this.postsStore.add(payload);
    } else {
      this.postsStore.update(this.editingId, payload);
    }

    this.newItem();
  }

  remove(id: number) {
    this.postsStore.remove(id);
    if (this.editingId === id) this.newItem();
  }
}
