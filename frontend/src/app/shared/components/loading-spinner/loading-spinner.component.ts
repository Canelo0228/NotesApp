import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  template: `
    <div class="loading-wrapper" [class.loading-wrapper--fullpage]="fullPage">
      <div class="loading-spinner">
        <div class="loading-spinner__ring"></div>
      </div>
      @if (message) {
        <p class="loading-message">{{ message }}</p>
      }
    </div>
  `,
  styles: [`
    .loading-wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 16px;
      padding: 60px;

    }

    .loading-wrapper--fullpage {
      min-height: 60vh;
    }

    .loading-wrapper {
    }

    .loading-spinner__ring {
      width: 36px;
      height: 36px;
      border: 2.5px solid var(--border);
      border-top-color: var(--accent-gold);
      border-radius: 50%;
      animation: spin 0.7s linear infinite;
    }

    .loading-message {
      font-size: 0.875rem;
      color: var(--text-muted);
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `]
})
export class LoadingSpinnerComponent {
  @Input() message = '';
  @Input() fullPage = false;
}
