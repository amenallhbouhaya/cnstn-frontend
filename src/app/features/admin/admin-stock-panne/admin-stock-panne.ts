import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs';

import { StockEnPanneApi, StockEnPanneItem } from '../../../core/services/stock-en-panne-api';

@Component({
  selector: 'app-admin-stock-panne',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-stock-panne.html',
  styleUrl: './admin-stock-panne.css'
})
export class AdminStockPanneComponent {
  private api = inject(StockEnPanneApi);

  items: StockEnPanneItem[] = [];
  loading = false;
  processingId: number | null = null;
  errorMsg = '';
  successMsg = '';

  ngOnInit() {
    this.load();
  }

  load() {
    this.loading = true;
    this.errorMsg = '';
    this.successMsg = '';

    this.api.all()
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: (data) => this.items = data ?? [],
        error: (err) => {
          console.log(err);
          this.errorMsg = 'Erreur chargement stock en panne';
        }
      });
  }

  restore(item: StockEnPanneItem) {
    if (!item?.id || this.processingId !== null) return;

    this.processingId = item.id;
    this.errorMsg = '';
    this.successMsg = '';

    this.api.restore(item.id)
      .pipe(finalize(() => this.processingId = null))
      .subscribe({
        next: (res) => {
          this.successMsg = `Piece "${res.restoredNom}" restauree dans le stock.`;
          this.items = this.items.filter(i => i.id !== item.id);
        },
        error: (err) => {
          console.log(err);
          this.errorMsg = 'Erreur restauration de la piece';
        }
      });
  }
}
