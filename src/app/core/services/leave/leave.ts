import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, catchError, of } from 'rxjs';
import { ILeave } from '../../../types/leave';
@Injectable({
  providedIn: 'root',
})
export class Leave {
  private api = 'https://68e663b421dd31f22cc5668f.mockapi.io/leaves';
  private _leaves = signal<ILeave[]>([]);
  private _loading = signal(false);
  private http = inject(HttpClient);
  leaves = computed(() => this._leaves());
  loading = computed(() => this._loading());

  loadLeaves() {
    this._loading.set(true);
    this.http
      .get<ILeave[]>(this.api)
      .pipe(
        tap((res) => this._leaves.set(res)),
        catchError(() => of([])),
        tap(() => this._loading.set(false)),
      )
      .subscribe();
  }

  addLeave(leave: ILeave) {
    this.http
      .post<ILeave>(this.api, leave)
      .pipe(
        tap((res) =>
          this._leaves.update((leaves) => [...leaves, { ...leave, id: res.id, status: 'Pending' }]),
        ),
      )
      .subscribe();
  }

  updateLeave(id: number, changes: Partial<ILeave>) {
    this.http
      .put(`${this.api}/${id}`, changes)
      .pipe(
        tap(() =>
          this._leaves.update((leaves) =>
            leaves.map((l) => (l.id === id ? { ...l, ...changes } : l)),
          ),
        ),
      )
      .subscribe();
  }

  deleteLeave(id: number) {
    this.http
      .delete(`${this.api}/${id}`)
      .pipe(tap(() => this._leaves.update((leaves) => leaves.filter((l) => l.id !== id))))
      .subscribe();
  }
}
