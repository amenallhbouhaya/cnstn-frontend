import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AdminDashboardService, AdminDashboardStats } from '../../../core/services/admin-dashboard';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-admin-home',
  standalone: true,
  imports: [CommonModule, RouterLink, BaseChartDirective],
  templateUrl: './admin-home.html',
  styleUrl: './admin-home.scss'
})
export class AdminHomeComponent implements OnInit {
  private dashApi = inject(AdminDashboardService);

  stats: AdminDashboardStats | null = null;
  loadingStats = false;
  statsError   = '';

  /* ── Charts ── */

  // --- Événements (blue family) ---
  eventsChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['Approuvés', 'En attente', 'Refusés'],
    datasets: [{
      label: 'Événements',
      data: [0, 0, 0],
      backgroundColor: ['rgba(54,130,237,.78)', 'rgba(100,165,245,.55)', 'rgba(30,80,180,.45)'],
      borderColor: ['#3682ed', '#64a5f5', '#1e50b4'],
      borderWidth: 1,
      borderRadius: 4
    }]
  };
  eventsChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: true, position: 'top' } },
    scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } }
  };

  // --- Salles (green / teal family) – doughnut ---
  sallesChartData: ChartConfiguration<'doughnut'>['data'] = {
    labels: ['Disponibles', 'Occupées'],
    datasets: [{
      data: [0, 0],
      backgroundColor: ['#1cc88a', '#0c7850'],
      borderColor: '#fff',
      borderWidth: 3,
      hoverOffset: 6
    }]
  };
  sallesChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '62%',
    plugins: {
      legend: { display: true, position: 'bottom', labels: { padding: 16, usePointStyle: true, pointStyleWidth: 10 } }
    }
  };

  // --- Interventions (orange family) – doughnut ---
  interventionsChartData: ChartConfiguration<'doughnut'>['data'] = {
    labels: ['Traitées', 'En attente'],
    datasets: [{
      data: [0, 0],
      backgroundColor: ['#e87e04', '#f5a63c'],
      borderColor: '#fff',
      borderWidth: 3,
      hoverOffset: 6
    }]
  };
  interventionsChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '62%',
    plugins: {
      legend: { display: true, position: 'bottom', labels: { padding: 16, usePointStyle: true, pointStyleWidth: 10 } }
    }
  };

  ngOnInit() {
    this.loadStats();
  }

  loadStats() {
    this.loadingStats = true;
    this.dashApi.stats().subscribe({
      next: s => {
        this.stats = s;
        this.loadingStats = false;
        this.updateCharts(s);
      },
      error: () => {
        this.statsError = 'Impossible de charger les statistiques';
        this.loadingStats = false;
      }
    });
  }

  private updateCharts(s: AdminDashboardStats) {
    this.eventsChartData = {
      ...this.eventsChartData,
      datasets: [{
        ...this.eventsChartData.datasets[0],
        data: [s.evenementsApprouves, s.evenementsEnAttente, s.evenementsRefuses]
      }]
    };
    this.sallesChartData = {
      ...this.sallesChartData,
      datasets: [{
        ...this.sallesChartData.datasets[0],
        data: [s.sallesDisponibles, s.sallesOccupees]
      }]
    };
    this.interventionsChartData = {
      ...this.interventionsChartData,
      datasets: [{
        ...this.interventionsChartData.datasets[0],
        data: [s.interventionsTotal - s.interventionsEnAttente, s.interventionsEnAttente]
      }]
    };
  }
}
