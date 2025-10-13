import { ErrorHandler, Injectable, inject, isDevMode } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class GlobalErrorHandler implements ErrorHandler {
  private router = inject(Router);

  handleError(error: unknown): void {
    let message = 'An unknown error occurred';

    if (error instanceof HttpErrorResponse) {
      console.error('HTTP Error:', error);
      message = `HTTP Error: ${error.status} ${error.statusText}`;
    } else if (error instanceof Error) {
      console.error('Client Error:', error);
      message = error.message;
    } else {
      console.error('Unexpected Error:', error);
    }

    if (!isDevMode()) {
      // TODO: Send error to server
      // this.logService.logError(error);
    }

    // Navigate to error page (optionally pass message as query param)
    this.router.navigateByUrl(`/error?message=${encodeURIComponent(message)}`);
  }
}
