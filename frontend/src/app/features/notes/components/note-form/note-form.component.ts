import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Note, CreateNoteRequest, UpdateNoteRequest } from '../../../../core/models/note.model';

@Component({
  selector: 'app-note-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="modal-overlay" (click)="onOverlayClick($event)">
      <div class="modal-panel note-form" role="dialog" aria-modal="true" [attr.aria-label]="isEditing ? 'Edit note' : 'New note'">

        <div class="note-form__header">
          <h2 class="note-form__title">
            {{ isEditing ? 'Edit Note' : 'New Note' }}
          </h2>
          <button class="btn btn--icon" (click)="cancel.emit()" aria-label="Close">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <form [formGroup]="form" (ngSubmit)="onSubmit()" class="note-form__body">

          <div class="form-field">
            <label for="title">Title</label>
            <input
              id="title"
              type="text"
              formControlName="title"
              placeholder="Note title…"
              autocomplete="off"
              [class.is-invalid]="titleInvalid"
            />
            @if (titleInvalid) {
              <span class="form-field__error">Title is required.</span>
            }
          </div>

          <div class="form-field">
            <label for="description">Description</label>
            <textarea
              id="description"
              formControlName="description"
              placeholder="Write your note here…"
              rows="7"
              [class.is-invalid]="contentInvalid"
            ></textarea>
            @if (contentInvalid) {
              <span class="form-field__error">Content is required.</span>
            }
          </div>

          <div class="note-form__actions">
            <button type="button" class="btn btn--ghost" (click)="cancel.emit()">
              Cancel
            </button>
            <button type="submit" class="btn btn--primary" [disabled]="form.invalid || loading">
              @if (loading) {
                <span class="spinner"></span>
              }
              {{ isEditing ? 'Save Changes' : 'Create Note' }}
            </button>
          </div>

        </form>
      </div>
    </div>
  `,
  styles: [`
    .note-form {
      width: 100%;
      max-width: 540px;
    }

    .note-form__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 28px;
    }

    .note-form__title {
      font-size: 1.35rem;
      color: var(--text-primary);
    }

    .note-form__body {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .note-form__actions {
      display: flex;
      justify-content: flex-end;
      gap: 10px;
      padding-top: 8px;
    }

    .form-field {
      input.is-invalid,
      textarea.is-invalid {
        border-color: var(--accent-danger);
      }
    }

    .form-field__error {
      font-size: 0.75rem;
      color: var(--accent-danger);
      margin-top: 2px;
    }

    textarea {
      resize: vertical;
      min-height: 140px;
    }

    .spinner {
      width: 14px;
      height: 14px;
      border: 2px solid rgba(14,14,14,0.3);
      border-top-color: #0e0e0e;
      border-radius: 50%;
      animation: spin 0.6s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `]
})
export class NoteFormComponent implements OnInit {
  @Input() note: Note | null = null;
  @Input() loading = false;
  @Output() save = new EventEmitter<CreateNoteRequest | UpdateNoteRequest>();
  @Output() cancel = new EventEmitter<void>();

  form!: FormGroup;

  get isEditing(): boolean { return !!this.note; }
  get titleInvalid(): boolean {
    const c = this.form.get('title');
    return !!(c?.invalid && c.touched);
  }
  get contentInvalid(): boolean {
  const c = this.form.get('description');
    return !!(c?.invalid && c.touched);
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      title:       [this.note?.title       ?? '', [Validators.required, Validators.maxLength(200)]],
      description: [this.note?.description ?? '', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.save.emit(this.form.value);
  }

  onOverlayClick(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('modal-overlay')) {
      this.cancel.emit();
    }
  }
}
