import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs';

import { StockEnPanneApi, StockEnPanneItem } from '../../../core/services/stock-en-panne-api';

@Component({
  selector: 'app-dsn-stock-panne',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dsn-stock-panne.html',
  styleUrl: './dsn-stock-panne.css'
})
export class DsnStockPanneComponent {
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
