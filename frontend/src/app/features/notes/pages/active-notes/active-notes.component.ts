import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoteService } from '../../../../core/services/note.service';
import { ToastService } from '../../../../core/services/toast.service';
import { Note, CreateNoteRequest, UpdateNoteRequest } from '../../../../core/models/note.model';
import { NoteCardComponent } from '../../components/note-card/note-card.component';
import { NoteFormComponent } from '../../components/note-form/note-form.component';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { EmptyStateComponent } from '../../../../shared/components/empty-state/empty-state.component';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-active-notes',
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
          <h1 class="page__title">Active Notes</h1>
          @if (!loading() && notes().length > 0) {
            <span class="page__count">{{ notes().length }} note{{ notes().length !== 1 ? 's' : '' }}</span>
          }
        </div>
        <button class="btn btn--primary" (click)="openCreateForm()">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"/>
            <line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          New Note
        </button>
      </div>

      @if (loading()) {
        <app-loading-spinner [fullPage]="true" message="Loading notes…" />
      }

      @if (!loading() && notes().length > 0) {
        <div class="notes-grid">
          @for (note of notes(); track note.id; let i = $index) {
            <app-note-card
              [note]="note"
              [style.animation-delay]="(i * 40) + 'ms'"
              (edit)="openEditForm($event)"
              (delete)="openDeleteDialog($event)"
              (toggleArchive)="onArchive($event)"
            />
          }
        </div>
      }

      @if (!loading() && notes().length === 0) {
        <app-empty-state
          icon="✦"
          title="No active notes"
          message="Create your first note to get started. Your thoughts, captured beautifully."
        >
          <button class="btn btn--primary" (click)="openCreateForm()">
            Create your first note
          </button>
        </app-empty-state>
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
    .page__header-text {
      display: flex;
      align-items: baseline;
      gap: 12px;
    }
    .page__title { font-size: 2rem; }
    .page__count { font-size: 0.875rem; color: var(--text-muted); }
    .notes-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 16px;
    }
  `]
})
export class ActiveNotesComponent implements OnInit {
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
    this.noteService.getActiveNotes().subscribe({
      next: notes => { this.notes.set(notes); this.loading.set(false); },
      error: ()   => this.loading.set(false)
    });
  }

  openCreateForm() { this.selectedNote.set(null); this.showForm.set(true); }
  openEditForm(note: Note) { this.selectedNote.set(note); this.showForm.set(true); }
  closeForm() { this.showForm.set(false); this.selectedNote.set(null); }

  openDeleteDialog(note: Note) { this.selectedNote.set(note); this.showDeleteDialog.set(true); }
  closeDeleteDialog() { this.showDeleteDialog.set(false); this.selectedNote.set(null); }

  deleteMessage(): string {
    return `Are you sure you want to delete "${this.selectedNote()?.title ?? ''}"? This action cannot be undone.`;
  }

  onSave(payload: CreateNoteRequest | UpdateNoteRequest) {
    this.saving.set(true);
    const current = this.selectedNote();

    if (current) {
      this.noteService.updateNote(current.id, payload as UpdateNoteRequest).subscribe({
        next: () => {
          this.toast.success('Note updated successfully.');
          this.closeForm();
          this.saving.set(false);
          this.loadNotes();
        },
        error: () => this.saving.set(false)
      });
    } else {
      this.noteService.createNote(payload as CreateNoteRequest).subscribe({
        next: () => {
          this.toast.success('Note created successfully.');
          this.closeForm();
          this.saving.set(false);
          this.loadNotes();
        },
        error: () => this.saving.set(false)
      });
    }
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

  onArchive(note: Note) {
    this.noteService.archiveNote(note.id).subscribe({
      next: () => {
        this.notes.update(list => list.filter(n => n.id !== note.id));
        this.toast.success('Note archived.');
      }
    });
  }
}