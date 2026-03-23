import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-toast-container',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="toast-container">
      @for (toast of toastService.toasts(); track toast.id) {
        <div class="toast toast--{{ toast.type }}" (click)="toastService.dismiss(toast.id)">
          <span class="toast__icon">
            @if (toast.type === 'success') { ✓ }
            @else if (toast.type === 'error') { ✕ }
            @else { ℹ }
          </span>
          {{ toast.message }}
        </div>
      }
    </div>
  `,
  styles: [`
    .toast-container {
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      gap: 8px;
      pointer-events: none;
    }

    .toast {
      display: flex;
      align-items: center;
      gap: 10px;
      background: var(--bg-elevated);
      border: 1px solid var(--border);
      border-radius: var(--radius-md);
      padding: 12px 18px;
      font-size: 0.875rem;
      color: var(--text-primary);
      box-shadow: var(--shadow-float);
      animation: toastIn 200ms ease forwards;
      pointer-events: all;
      cursor: pointer;
      max-width: 320px;

    }

    .toast--success {
      border-left: 3px solid var(--accent-success);

      .toast__icon { color: var(--accent-success); }
    }

    .toast--error {
      border-left: 3px solid var(--accent-danger);

      .toast__icon { color: var(--accent-danger); }
    }

    .toast--info {
      border-left: 3px solid var(--accent-gold);

      .toast__icon { color: var(--accent-gold); }
    }

    .toast {
    }

    .toast__icon {
      font-size: 0.875rem;
      font-weight: 700;
      flex-shrink: 0;
    }

    @keyframes toastIn {
      from { opacity: 0; transform: translateX(20px); }
      to   { opacity: 1; transform: translateX(0); }
    }
  `]
})
export class ToastContainerComponent {
  toastService = inject(ToastService);
}
