import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ToastService } from '../services/toast.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toast = inject(ToastService);

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      let message = 'An unexpected error occurred.';
      if (err.status === 0) {
        message = 'Cannot connect to the server. Make sure the backend is running.';
      } else if (err.status === 404) {
        message = 'Resource not found.';
      } else if (err.status === 400) {
        message = err.error?.message || 'Invalid request.';
      } else if (err.status >= 500) {
        message = 'Server error. Please try again later.';
      }
      toast.error(message);
      return throwError(() => err);
    })
  );
};
