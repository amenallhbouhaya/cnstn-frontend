import { Component, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { finalize } from 'rxjs';
import { DocumentApi } from '../../../core/services/document-api';
import { DocumentItem } from '../../../core/models/document';

@Component({
  selector: 'app-employe-documents',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employe-documents.html',
  styleUrl: './employe-documents.scss'
})
export class EmployeDocumentsComponent {
  private api = inject(DocumentApi);
  private platformId = inject(PLATFORM_ID);
  private readonly seenKey = 'employe_seen_doc_ids';

  items: DocumentItem[] = [];
  newDocIds = new Set<number>();
  loading = false;
  errorMsg = '';

  ngOnInit() {
    this.load();
  }

 load() {
  this.loading = true;
  this.errorMsg = '';

  this.api.myDocs()
    .pipe(finalize(() => this.loading = false))
    .subscribe({
        next: (data) => {
          this.items = data ?? [];
          this.computeNewDocs();
        },
      error: (err) => {
        console.log(err);
        this.errorMsg = 'Erreur chargement documents';
      }
    });
}

    get newDocsCount(): number {
      return this.newDocIds.size;
    }

    isNew(docId: number): boolean {
      return this.newDocIds.has(docId);
    }

    markAllAsRead() {
      this.saveSeenIds(this.items.map(d => d.id));
      this.newDocIds.clear();
    }

  download(doc: DocumentItem) {
    this.api.download(doc.id).subscribe({
      next: (blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = (doc.titre?.trim() || 'document');
        a.click();
        setTimeout(() => URL.revokeObjectURL(url), 5000);
        this.markAsRead(doc.id);
      },
      error: (err) => {
        console.log(err);
        this.errorMsg = 'Erreur téléchargement document';
      }
    });
  }

  private computeNewDocs() {
    const seen = this.readSeenIds();
    this.newDocIds = new Set(this.items.filter(d => !seen.has(d.id)).map(d => d.id));
  }

  private markAsRead(docId: number) {
    const seen = this.readSeenIds();
    seen.add(docId);
    this.saveSeenIds(Array.from(seen));
    this.newDocIds.delete(docId);
  }

  private readSeenIds(): Set<number> {
    if (!isPlatformBrowser(this.platformId)) return new Set<number>();

    const raw = localStorage.getItem(this.seenKey);
    if (!raw) return new Set<number>();

    try {
      const parsed = JSON.parse(raw) as number[];
      return new Set((parsed ?? []).filter(n => Number.isFinite(n)));
    } catch {
      return new Set<number>();
    }
  }

  private saveSeenIds(ids: number[]) {
    if (!isPlatformBrowser(this.platformId)) return;
    localStorage.setItem(this.seenKey, JSON.stringify(Array.from(new Set(ids))));
  }
}