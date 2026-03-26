import { Injectable, signal } from '@angular/core';
import { PublicPost } from '../models/public-post';

const STORAGE_KEY = 'cnstn.public.posts.v1';

const DEFAULT_POSTS: PublicPost[] = [
  {
    id: 1,
    title: 'Innovation & Recherche',
    description: 'Nouvelles initiatives autour de la recherche appliquee et de la valorisation scientifique au sein du CNSTN.',
    imageUrl: 'https://picsum.photos/seed/cnstn-news-1/960/520',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 2,
    title: 'Evenements Institutionnels',
    description: 'Programme des rencontres, ateliers et annonces internes pour renforcer la coordination entre les equipes.',
    imageUrl: 'https://picsum.photos/seed/cnstn-news-2/960/520',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 3,
    title: 'Securite & Qualite',
    description: 'Mises a jour des procedures, bonnes pratiques et informations essentielles pour un environnement maitrise.',
    imageUrl: 'https://picsum.photos/seed/cnstn-news-3/960/520',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

@Injectable({ providedIn: 'root' })
export class PublicPostsStore {
  readonly posts = signal<PublicPost[]>(this.load());

  add(payload: { title: string; description: string; imageUrl: string }) {
    const now = new Date().toISOString();
    const next: PublicPost = {
      id: Date.now(),
      title: payload.title.trim(),
      description: payload.description.trim(),
      imageUrl: payload.imageUrl.trim(),
      createdAt: now,
      updatedAt: now
    };

    this.updateState([next, ...this.posts()]);
  }

  update(id: number, payload: { title: string; description: string; imageUrl: string }) {
    const next = this.posts().map((p) => {
      if (p.id !== id) return p;
      return {
        ...p,
        title: payload.title.trim(),
        description: payload.description.trim(),
        imageUrl: payload.imageUrl.trim(),
        updatedAt: new Date().toISOString()
      };
    });

    this.updateState(next);
  }

  remove(id: number) {
    this.updateState(this.posts().filter((p) => p.id !== id));
  }

  private updateState(posts: PublicPost[]) {
    this.posts.set(posts);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  }

  private load(): PublicPost[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_POSTS));
        return DEFAULT_POSTS;
      }

      const parsed = JSON.parse(raw) as PublicPost[];
      if (!Array.isArray(parsed) || parsed.length === 0) return DEFAULT_POSTS;
      return parsed;
    } catch {
      return DEFAULT_POSTS;
    }
  }
}
