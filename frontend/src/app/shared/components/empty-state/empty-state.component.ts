import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  template: `
    <div class="empty-state">
      <div class="empty-state__icon">{{ icon }}</div>
      <h3 class="empty-state__title">{{ title }}</h3>
      <p class="empty-state__message">{{ message }}</p>
      <ng-content />
    </div>
  `,
  styles: [`
    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 80px 24px;
      animation: fadeIn 300ms ease;
    }

    .empty-state__icon {
      font-size: 3rem;
      margin-bottom: 20px;
      opacity: 0.4;
      filter: grayscale(1);
    }

    .empty-state__title {
      font-size: 1.25rem;
      color: var(--text-primary);
      margin-bottom: 8px;
    }

    .empty-state__message {
      font-size: 0.875rem;
      color: var(--text-secondary);
      max-width: 300px;
      line-height: 1.7;
      margin-bottom: 28px;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(12px); }
      to   { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class EmptyStateComponent {
  @Input() icon = '📋';
  @Input() title = 'Nothing here yet';
  @Input() message = '';
}
