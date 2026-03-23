import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoteService } from '../../../../core/services/note.service';
import { ToastService } from '../../../../core/services/toast.service';
import { Note, UpdateNoteRequest } from '../../../../core/models/note.model';
import { NoteCardComponent } from '../../components/note-card/note-card.component';
import { NoteFormComponent } from '../../components/note-form/note-form.component';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { EmptyStateComponent } from '../../../../shared/components/empty-state/empty-state.component';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-archived-notes',
  standalone: true,
  imports: [
    CommonModule,
    NoteCardComponent,
    NoteFormComponent,
    ConfirmDialogComponent,
    EmptyStateComponent,
    LoadingSpinnerComponent
  ],
  template: `
    <div class="page">

      <div class="page__header">
        <div class="page__header-text">
          <h1 class="page__title">Archived</h1>
          @if (!loading() && notes().length > 0) {
            <span class="page__count">{{ notes().length }} note{{ notes().length !== 1 ? 's' : '' }}</span>
          }
        </div>
        <div class="page__header-badge">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="21 8 21 21 3 21 3 8"/>
            <rect x="1" y="3" width="22" height="5"/>
            <line x1="10" y1="12" x2="14" y2="12"/>
          </svg>
          Archive
        </div>
      </div>

      @if (loading()) {
        <app-loading-spinner [fullPage]="true" message="Loading archive…" />
      }

      @if (!loading() && notes().length > 0) {
        <div class="notes-grid">
          @for (note of notes(); track note.id; let i = $index) {
            <app-note-card
              [note]="note"
              [style.animation-delay]="(i * 40) + 'ms'"
              (edit)="openEditForm($event)"
              (delete)="openDeleteDialog($event)"
              (toggleArchive)="onUnarchive($event)"
            />
          }
        </div>
      }

      @if (!loading() && notes().length === 0) {
        <app-empty-state
          icon="📦"
          title="Archive is empty"
          message="Notes you archive will appear here. Archived notes can be restored at any time."
        />
      }

    </div>

    @if (showForm()) {
      <app-note-form
        [note]="selectedNote()"
        [loading]="saving()"
        (save)="onSave($event)"
        (cancel)="closeForm()"
      />
    }

    @if (showDeleteDialog()) {
      <app-confirm-dialog
        title="Delete Note"
        [message]="deleteMessage()"
        confirmLabel="Delete"
        (confirm)="onDeleteConfirm()"
        (cancel)="closeDeleteDialog()"
      />
    }
  `,
  styles: [`
    .page__header {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      margin-bottom: 36px;
      gap: 16px;
      flex-wrap: wrap;
    }
    .page__header-text { display: flex; align-items: baseline; gap: 12px; }
    .page__title { font-size: 2rem; }
    .page__count { font-size: 0.875rem; color: var(--text-muted); }
    .page__header-badge {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 0.75rem;
      font-weight: 500;
      color: var(--text-muted);
      background: var(--bg-elevated);
      border: 1px solid var(--border);
      border-radius: var(--radius-md);
      padding: 6px 12px;
      letter-spacing: 0.04em;
      text-transform: uppercase;
    }
    .notes-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 16px;
    }
  `]
})
export class ArchivedNotesComponent implements OnInit {
  notes            = signal<Note[]>([]);
  loading          = signal(false);
  saving           = signal(false);
  showForm         = signal(false);
  showDeleteDialog = signal(false);
  selectedNote     = signal<Note | null>(null);

  constructor(
    private noteService: NoteService,
    private toast: ToastService
  ) {}

  ngOnInit() { this.loadNotes(); }

  loadNotes() {
    this.loading.set(true);
    this.noteService.getArchivedNotes().subscribe({
      next: notes => { this.notes.set(notes); this.loading.set(false); },
      error: ()   => this.loading.set(false)
    });
  }

  openEditForm(note: Note) { this.selectedNote.set(note); this.showForm.set(true); }
  closeForm() { this.showForm.set(false); this.selectedNote.set(null); }

  openDeleteDialog(note: Note) { this.selectedNote.set(note); this.showDeleteDialog.set(true); }
  closeDeleteDialog() { this.showDeleteDialog.set(false); this.selectedNote.set(null); }

  deleteMessage(): string {
    return `Permanently delete "${this.selectedNote()?.title ?? ''}"? This cannot be undone.`;
  }

  onSave(payload: UpdateNoteRequest) {
    const current = this.selectedNote();
    if (!current) return;
    this.saving.set(true);
    this.noteService.updateNote(current.id, payload).subscribe({
      next: () => {
        this.toast.success('Note updated.');
        this.closeForm();
        this.saving.set(false);
        this.loadNotes();
      },
      error: () => this.saving.set(false)
    });
  }

  onDeleteConfirm() {
    const note = this.selectedNote();
    if (!note) return;
    this.noteService.deleteNote(note.id).subscribe({
      next: () => {
        this.notes.update(list => list.filter(n => n.id !== note.id));
        this.toast.success('Note deleted.');
        this.closeDeleteDialog();
      }
    });
  }

  onUnarchive(note: Note) {
    this.noteService.unarchiveNote(note.id).subscribe({
      next: () => {
        this.notes.update(list => list.filter(n => n.id !== note.id));
        this.toast.success('Note restored to active.');
      }
    });
  }
}