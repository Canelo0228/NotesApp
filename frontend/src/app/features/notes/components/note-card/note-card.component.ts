import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Note } from '../../../../core/models/note.model';

@Component({
  selector: 'app-note-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <article class="note-card" [class.note-card--archived]="note.isArchived">
      <div class="note-card__body">
        <h3 class="note-card__title">{{ note.title }}</h3>
        <p class="note-card__content">{{ note.description }}</p>
      </div>

      <div class="note-card__footer">
        
        <div class="note-card__actions">
          <button
            class="btn btn--icon note-card__action"
            title="Edit note"
            (click)="edit.emit(note)"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
          </button>

          <button
            class="btn btn--icon note-card__action"
            [title]="note.isArchived ? 'Unarchive note' : 'Archive note'"
            (click)="toggleArchive.emit(note)"
          >
            @if (note.isArchived) {
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="1 6 1 22 23 22 23 6"/>
                <path d="M1 6l11-4 11 4"/>
                <line x1="8" y1="14" x2="16" y2="14"/>
              </svg>
            } @else {
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="21 8 21 21 3 21 3 8"/>
                <rect x="1" y="3" width="22" height="5"/>
                <line x1="10" y1="12" x2="14" y2="12"/>
              </svg>
            }
          </button>

          <button
            class="btn btn--icon note-card__action note-card__action--delete"
            title="Delete note"
            (click)="delete.emit(note)"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="3 6 5 6 21 6"/>
              <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
              <path d="M10 11v6M14 11v6"/>
              <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
            </svg>
          </button>
        </div>
      </div>
    </article>
  `,
  styles: [`
    .note-card {
      background: var(--bg-surface);
      border: 1px solid var(--border);
      border-radius: var(--radius-lg);
      padding: 22px;
      display: flex;
      flex-direction: column;
      gap: 16px;
      transition: border-color var(--transition), transform var(--transition), box-shadow var(--transition);
      animation: fadeIn 250ms ease both;
      height: 100%;

      &:hover {
        border-color: rgba(201, 168, 76, 0.3);
        transform: translateY(-2px);
        box-shadow: var(--shadow-card);
      }

    }

    .note-card--archived {
      opacity: 0.7;
      border-style: dashed;

      .note-card__title { color: var(--text-secondary); }
    }

    .note-card {
    }

    .note-card__body {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 10px;
      overflow: hidden;
    }

    .note-card__title {
      font-family: 'Playfair Display', serif;
      font-size: 1.05rem;
      font-weight: 600;
      color: var(--text-primary);
      line-height: 1.35;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .note-card__content {
      font-size: 0.875rem;
      color: var(--text-secondary);
      line-height: 1.6;
      display: -webkit-box;
      -webkit-line-clamp: 4;
      -webkit-box-orient: vertical;
      overflow: hidden;
      flex: 1;
    }

    .note-card__footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-top: 12px;
      border-top: 1px solid var(--border);
    }

    .note-card__date {
      font-size: 0.75rem;
      color: var(--text-muted);
      letter-spacing: 0.02em;
    }

    .note-card__actions {
      display: flex;
      align-items: center;
      gap: 2px;
      opacity: 0;
      transition: opacity var(--transition);
    }

    .note-card:hover .note-card__actions {
      opacity: 1;
    }

    .note-card__action {
      width: 30px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;

    }

    .note-card__action--delete:hover {
      color: var(--accent-danger) !important;
      background: rgba(192, 57, 43, 0.1) !important;
    }

    .note-card__action {
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(8px); }
      to   { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class NoteCardComponent {
  @Input({ required: true }) note!: Note;
  @Output() edit = new EventEmitter<Note>();
  @Output() delete = new EventEmitter<Note>();
  @Output() toggleArchive = new EventEmitter<Note>();
}
