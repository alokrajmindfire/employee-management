import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, forkJoin } from 'rxjs';

export interface Task {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}
export interface Leave {
  id: number;
  date: string;
  type: string;
  status: 'Approved' | 'Rejected' | 'Pending';
}
@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private tasksUrl = 'https://jsonplaceholder.typicode.com/todos';
  private leavesUrl = 'https://68e663b421dd31f22cc5668f.mockapi.io/leaves';
  private http = inject(HttpClient);

  fetchTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.tasksUrl);
  }

  fetchLeaves(): Observable<Leave[]> {
    return this.http.get<Leave[]>(this.leavesUrl);
  }

  getAggregatedStats() {
    return forkJoin({ tasks: this.fetchTasks(), leaves: this.fetchLeaves() }).pipe(
      map(({ tasks, leaves }) => {
        const tasksCompleted = tasks.filter((t) => t.completed).length;
        const tasksPending = tasks.length - tasksCompleted;

        const leavesApproved = leaves.filter((l) => l.status === 'Approved').length;
        const leavesPending = leaves.filter((l) => l.status === 'Pending').length;
        const leavesRejected = leaves.filter((l) => l.status === 'Rejected').length;

        return {
          tasks: { total: tasks.length, completed: tasksCompleted, pending: tasksPending },
          leaves: {
            total: leaves.length,
            approved: leavesApproved,
            pending: leavesPending,
            rejected: leavesRejected,
          },
        };
      }),
    );
  }
}
