import { Component, inject, OnInit } from '@angular/core';
import { DashboardService } from '../../core/services/dashboard/dashboard';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, registerables, ChartConfiguration, ChartOptions } from 'chart.js';
import { Card } from '../../component/card/card';
import { Loader } from '../../component/loader/loader';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, BaseChartDirective, Card, Loader],
  templateUrl: './dashboard.html',
})
export class Dashboard implements OnInit {
  // Individual loading and error states
  tasksLoading = true;
  tasksError: string | null = null;

  leavesLoading = true;
  leavesError: string | null = null;

  // Chart data
  tasksChartData!: ChartConfiguration<'doughnut'>['data'];
  leavesChartData!: ChartConfiguration<'doughnut'>['data'];

  // Chart options
  tasksChartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    plugins: { legend: { display: false } },
  };
  leavesChartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    plugins: { legend: { display: false } },
  };

  // Summary
  summary = {
    tasks: { total: 0, completed: 0, pending: 0 },
    leaves: { total: 0, approved: 0, pending: 0, rejected: 0 },
  };

  private svc = inject(DashboardService);

  ngOnInit(): void {
    this.loadTasks();
    this.loadLeaves();
  }

  loadTasks() {
    this.tasksLoading = true;
    this.tasksError = null;
    this.svc.fetchTasks().subscribe({
      next: (data) => {
        this.summary.tasks = data;
        this.tasksChartData = {
          labels: ['Completed', 'Pending'],
          datasets: [{ data: [data.completed, data.pending] }],
        };
        this.tasksLoading = false;
      },
      error: (err) => {
        this.tasksError = err.message || 'Error loading tasks.';
        this.tasksLoading = false;
      },
    });
  }

  loadLeaves() {
    this.leavesLoading = true;
    this.leavesError = null;
    this.svc.fetchLeaves().subscribe({
      next: (data) => {
        this.summary.leaves = data;
        this.leavesChartData = {
          labels: ['Approved', 'Pending', 'Rejected'],
          datasets: [
            {
              data: [data.approved, data.pending, data.rejected],
            },
          ],
        };
        this.leavesLoading = false;
      },
      error: (err) => {
        this.leavesError = err.message || 'Error loading leaves.';
        this.leavesLoading = false;
      },
    });
  }
}
