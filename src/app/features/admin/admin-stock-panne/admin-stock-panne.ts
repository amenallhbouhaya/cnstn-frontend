import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs';

import { StockEnPanneApi, StockEnPanneItem } from '../../../core/services/stock-en-panne-api';

@Component({
  selector: 'app-admin-stock-panne',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-stock-panne.html',
  styleUrl: './admin-stock-panne.scss'
})
export class AdminStockPanneComponent {
  private api = inject(StockEnPanneApi);

  items: StockEnPanneItem[] = [];
  loading = false;
  errorMsg = '';

  ngOnInit() {
    this.load();
  }

  load() {
    this.loading = true;
    this.errorMsg = '';

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
}
