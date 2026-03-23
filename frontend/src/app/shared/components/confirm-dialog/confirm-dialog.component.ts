import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  template: `
    <div class="modal-overlay" (click)="onOverlayClick($event)">
      <div class="modal-panel confirm-dialog" role="alertdialog" aria-modal="true">
        <div class="confirm-dialog__icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
        </div>
        <h3 class="confirm-dialog__title">{{ title }}</h3>
        <p class="confirm-dialog__message">{{ message }}</p>
        <div class="confirm-dialog__actions">
          <button class="btn btn--ghost" (click)="cancel.emit()">Cancel</button>
          <button class="btn btn--danger" (click)="confirm.emit()">{{ confirmLabel }}</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .confirm-dialog {
      max-width: 400px;
      text-align: center;
    }

    .confirm-dialog__icon {
      width: 52px;
      height: 52px;
      border-radius: 50%;
      background: rgba(192,57,43,0.1);
      border: 1px solid rgba(192,57,43,0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 20px;
      color: var(--accent-danger);
    }

    .confirm-dialog__title {
      font-size: 1.15rem;
      margin-bottom: 8px;
    }

    .confirm-dialog__message {
      font-size: 0.875rem;
      color: var(--text-secondary);
      line-height: 1.6;
      margin-bottom: 28px;
    }

    .confirm-dialog__actions {
      display: flex;
      justify-content: center;
      gap: 10px;
    }
  `]
})
export class ConfirmDialogComponent {
  @Input() title = 'Are you sure?';
  @Input() message = 'This action cannot be undone.';
  @Input() confirmLabel = 'Delete';
  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  onOverlayClick(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('modal-overlay')) {
      this.cancel.emit();
    }
  }
}
