import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

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

  fetchTasks(): Observable<{ total: number; completed: number; pending: number }> {
    return this.http.get<Task[]>(this.tasksUrl).pipe(
      map((tasks) => {
        const completed = tasks.filter((t) => t.completed).length;
        const pending = tasks.length - completed;
        return { total: tasks.length, completed, pending };
      }),
      catchError((err) => {
        console.error('Error fetching tasks:', err);
        return throwError(() => new Error('Failed to fetch tasks'));
      }),
    );
  }

  fetchLeaves(): Observable<{
    total: number;
    approved: number;
    pending: number;
    rejected: number;
  }> {
    return this.http.get<Leave[]>(this.leavesUrl).pipe(
      map((leaves) => {
        const approved = leaves.filter((l) => l.status === 'Approved').length;
        const pending = leaves.filter((l) => l.status === 'Pending').length;
        const rejected = leaves.filter((l) => l.status === 'Rejected').length;
        return { total: leaves.length, approved, pending, rejected };
      }),
      catchError((err) => {
        console.error('Error fetching leaves:', err);
        return throwError(() => new Error('Failed to fetch leaves'));
      }),
    );
  }
}
