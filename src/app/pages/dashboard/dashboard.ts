import { Component, inject, OnInit } from '@angular/core';
import { DashboardService } from '../../core/services/dashboard/dashboard';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, registerables, ChartConfiguration, ChartOptions } from 'chart.js';
import { Card } from '../../component/card/card';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, BaseChartDirective, Card],
  templateUrl: './dashboard.html',
})
export class Dashboard implements OnInit {
  loading = true;
  error: string | null = null;

  tasksChartData!: ChartConfiguration<'doughnut'>['data'];
  leavesChartData!: ChartConfiguration<'doughnut'>['data'];

  tasksChartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    plugins: { legend: { display: false } },
  };

  leavesChartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    plugins: { legend: { display: false } },
  };

  summary = {
    tasks: { total: 0, completed: 0, pending: 0 },
    leaves: { total: 0, approved: 0, pending: 0, rejected: 0 },
  };

  private svc = inject(DashboardService);

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.loading = true;
    this.error = null;
    this.svc.getAggregatedStats().subscribe({
      next: (stats) => {
        this.summary = stats;

        this.tasksChartData = {
          labels: ['Completed', 'Pending'],
          datasets: [{ data: [this.summary.tasks.completed, this.summary.tasks.pending] }],
        };

        this.leavesChartData = {
          labels: ['Approved', 'Pending', 'Rejected'],
          datasets: [
            {
              data: [
                this.summary.leaves.approved,
                this.summary.leaves.pending,
                this.summary.leaves.rejected,
              ],
            },
          ],
        };

        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load dashboard stats.';
        console.error(err);
        this.loading = false;
      },
    });
  }
}
